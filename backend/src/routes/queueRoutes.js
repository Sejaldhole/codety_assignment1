const express = require("express");

const {
  create,
  getByProject,
  pauseQueue,
  resumeQueue,
} = require("../controllers/queueController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post("/", authMiddleware, create);

router.get(
  "/project/:projectId",
  authMiddleware,
  getByProject
);

router.patch(
  "/:id/pause",
  authMiddleware,
  pauseQueue
);

router.patch(
  "/:id/resume",
  authMiddleware,
  resumeQueue
);

module.exports = router;