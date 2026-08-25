const pool = require("../config/db");

const sendHeartbeat = async () => {
  try {

    await pool.query(
      `
      INSERT INTO worker_heartbeats
      (worker_id)
      VALUES ($1)
      `,
      [1]
    );

    await pool.query(
      `
      UPDATE workers
      SET last_heartbeat = NOW()
      WHERE id = $1
      `,
      [1]
    );

    console.log(
      "Heartbeat sent by Worker 1"
    );

  } catch (error) {
    console.error(
      "Heartbeat Error:",
      error.message
    );
  }
};

module.exports = sendHeartbeat;