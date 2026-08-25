const {
  createQueue,
  getQueuesByProject,
  updateQueueStatus,
} = require("../models/queueModel");

const create = async (req, res) => {
  try {
    const {
      project_id,
      name,
      priority,
      concurrency_limit,
    } = req.body;

    const queue = await createQueue(
      project_id,
      name,
      priority,
      concurrency_limit
    );

    res.status(201).json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getByProject = async (req, res) => {
  try {
    const queues = await getQueuesByProject(
      req.params.projectId
    );

    res.json(queues);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const pauseQueue = async (req, res) => {
  try {
    const queue = await updateQueueStatus(
      req.params.id,
      true
    );

    res.json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resumeQueue = async (req, res) => {
  try {
    const queue = await updateQueueStatus(
      req.params.id,
      false
    );

    res.json(queue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getByProject,
  pauseQueue,
  resumeQueue,
};