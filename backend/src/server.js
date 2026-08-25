require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const queueRoutes = require("./routes/queueRoutes");
const jobRoutes = require("./routes/jobRoutes");
const processJobs = require("./workers/jobWorker");
const sendHeartbeat = require("./workers/heartbeatWorker");
const metricsRoutes = require("./routes/metricsRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/metrics", metricsRoutes);

setInterval(() => {
  processJobs();
}, 5000);

setInterval(() => {
  sendHeartbeat();
}, 10000);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});