const pool = require("../config/db");

const getMetrics = async (req, res) => {
  try {

    const totalJobs = await pool.query(
      `SELECT COUNT(*) FROM jobs`
    );

    const completedJobs = await pool.query(
      `SELECT COUNT(*) FROM jobs
       WHERE status='COMPLETED'`
    );

    const queuedJobs = await pool.query(
      `SELECT COUNT(*) FROM jobs
       WHERE status='QUEUED'`
    );

    const dlqJobs = await pool.query(
      `SELECT COUNT(*) FROM jobs
       WHERE status='DLQ'`
    );

    const workers = await pool.query(
      `SELECT COUNT(*) FROM workers`
    );

    res.json({
      totalJobs:
        Number(totalJobs.rows[0].count),

      completedJobs:
        Number(completedJobs.rows[0].count),

      queuedJobs:
        Number(queuedJobs.rows[0].count),

      dlqJobs:
        Number(dlqJobs.rows[0].count),

      workers:
        Number(workers.rows[0].count),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getMetrics,
};