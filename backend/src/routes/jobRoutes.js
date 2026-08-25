const express = require("express");

const {
  create,
  getByQueue,
  createBatch,
} = require("../controllers/jobController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post("/", authMiddleware, create);

router.post(
  "/batch",
  authMiddleware,
  createBatch
);

router.get(
  "/queue/:queueId",
  authMiddleware,
  getByQueue
);

module.exports = router;