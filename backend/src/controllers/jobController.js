const {
  createJob,
  getJobsByQueue,
} = require("../models/jobModel");

const create = async (req, res) => {
  try {
    const {
      queue_id,
      name,
      payload,
      scheduled_at,
      retry_strategy,
      max_retries,
    } = req.body;

    const job = await createJob(
      queue_id,
      name,
      payload || {},
      scheduled_at || null,
      retry_strategy || "FIXED",
      max_retries || 3
    );

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getByQueue = async (req, res) => {
  try {
    const jobs = await getJobsByQueue(
      req.params.queueId
    );

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createBatch = async (req, res) => {
  try {
    const jobs = req.body.jobs;

    const createdJobs = [];

    for (const job of jobs) {
      const created = await createJob(
        job.queue_id,
        job.name,
        job.payload || {},
        job.scheduled_at || null,
        job.retry_strategy || "FIXED",
        job.max_retries || 3
      );

      createdJobs.push(created);
    }

    res.status(201).json(createdJobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getByQueue,
  createBatch,
};