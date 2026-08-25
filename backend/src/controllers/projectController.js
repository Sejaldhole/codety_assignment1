const {
  createProject,
  getProjectsByUser,
} = require("../models/projectModel");

const create = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await createProject(
      name,
      description,
      req.user.id
    );

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const projects = await getProjectsByUser(
      req.user.id
    );

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
};