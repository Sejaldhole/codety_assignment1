const pool = require("../config/db");

const createJob = async (
  queueId,
  name,
  payload,
  scheduledAt,
  retryStrategy,
  maxRetries
) => {
  const status = scheduledAt ? "SCHEDULED" : "QUEUED";

  const result = await pool.query(
    `
    INSERT INTO jobs
    (
      queue_id,
      name,
      payload,
      status,
      scheduled_at,
      retry_strategy,
      max_retries
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [
      queueId,
      name,
      payload,
      status,
      scheduledAt,
      retryStrategy,
      maxRetries,
    ]
  );

  return result.rows[0];
};

const getJobsByQueue = async (queueId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM jobs
    WHERE queue_id = $1
    ORDER BY created_at DESC
    `,
    [queueId]
  );

  return result.rows;
};

module.exports = {
  createJob,
  getJobsByQueue,
};