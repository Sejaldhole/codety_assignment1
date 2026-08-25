const pool = require("../config/db");

const createQueue = async (
  projectId,
  name,
  priority,
  concurrencyLimit
) => {
  const result = await pool.query(
    `
    INSERT INTO queues
    (project_id, name, priority, concurrency_limit)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [projectId, name, priority, concurrencyLimit]
  );

  return result.rows[0];
};

const getQueuesByProject = async (projectId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM queues
    WHERE project_id = $1
    ORDER BY created_at DESC
    `,
    [projectId]
  );

  return result.rows;
};

const updateQueueStatus = async (queueId, isPaused) => {
  const result = await pool.query(
    `
    UPDATE queues
    SET is_paused = $1
    WHERE id = $2
    RETURNING *
    `,
    [isPaused, queueId]
  );

  return result.rows[0];
};

module.exports = {
  createQueue,
  getQueuesByProject,
  updateQueueStatus,
};