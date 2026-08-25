
const pool = require("../config/db");

const processJobs = async () => {
  let job = null;

  try {
    const result = await pool.query(`
      UPDATE jobs
      SET status = 'CLAIMED'
      WHERE id = (
        SELECT id
        FROM jobs
        WHERE status = 'QUEUED'
        ORDER BY created_at ASC
        LIMIT 1
      )
      RETURNING *
    `);

    if (result.rows.length === 0) {
      return;
    }

    job = result.rows[0];

    console.log(
      `Claimed Job ${job.id} - ${job.name}`
    );

    await pool.query(
      `
      UPDATE jobs
      SET status = 'RUNNING'
      WHERE id = $1
      `,
      [job.id]
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    // Force failure for testing
    const shouldFail = true;

    if (shouldFail) {
      throw new Error("Simulated Job Failure");
    }

    await pool.query(
      `
      UPDATE jobs
      SET status = 'COMPLETED',
          updated_at = NOW()
      WHERE id = $1
      `,
      [job.id]
    );

    console.log(
      `Completed Job ${job.id}`
    );

  } catch (error) {

    console.log(
      `Job Failed: ${error.message}`
    );

    if (!job) {
      return;
    }

    try {

      const retryResult = await pool.query(
        `
        UPDATE jobs
        SET retry_count = retry_count + 1
        WHERE id = $1
        RETURNING *
        `,
        [job.id]
      );

      const updatedJob = retryResult.rows[0];

      if (
        updatedJob.retry_count <
        updatedJob.max_retries
      ) {

        await pool.query(
          `
          UPDATE jobs
          SET status = 'QUEUED'
          WHERE id = $1
          `,
          [job.id]
        );

        console.log(
          `Retrying Job ${job.id} (${updatedJob.retry_count}/${updatedJob.max_retries})`
        );

      } else {

        await pool.query(
          `
          UPDATE jobs
          SET status = 'DLQ'
          WHERE id = $1
          `,
          [job.id]
        );

        await pool.query(
          `
          INSERT INTO dead_letter_queue
          (job_id, failure_reason)
          VALUES ($1, $2)
          `,
          [
            job.id,
            error.message,
          ]
        );

        console.log(
          `Moved Job ${job.id} to DLQ`
        );
      }

    } catch (dbError) {

      console.error(
        "Retry/DLQ Error:",
        dbError.message
      );

    }
  }
};

module.exports = processJobs;