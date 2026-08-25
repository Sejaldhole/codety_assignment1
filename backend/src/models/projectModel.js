const pool = require("../config/db");

const createProject = async (
  name,
  description,
  userId
) => {
  const result = await pool.query(
    `
    INSERT INTO projects(name, description, user_id)
    VALUES($1,$2,$3)
    RETURNING *
    `,
    [name, description, userId]
  );

  return result.rows[0];
};

const getProjectsByUser = async (userId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM projects
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

module.exports = {
  createProject,
  getProjectsByUser,
};