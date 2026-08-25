import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../Layout/Layout";

import {
  IconJobs,
  IconWorkers,
  IconQueues,
  IconInbox,
  IconDashboard,
} from "../components/Icons";

function statusPillClass(status) {
  const s = (status || "").toLowerCase();

  if (["completed", "success", "done"].includes(s))
    return "pill-success";

  if (["queued", "pending", "waiting"].includes(s))
    return "pill-warning";

  if (["failed", "dlq", "error"].includes(s))
    return "pill-danger";

  if (["running", "processing", "in_progress"].includes(s))
    return "pill-info";

  return "pill-neutral";
}

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [projects, setProjects] = useState([]);
  const [queues, setQueues] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchAll();

    const interval = setInterval(() => {
      fetchAll();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchAll = async () => {
    try {
      const metricsRes = await api.get("/metrics");
      setMetrics(metricsRes.data);

      const projectsRes = await api.get("/projects");
      setProjects(projectsRes.data);

      const queuesRes = await api.get("/queues");
      setQueues(queuesRes.data);

      const jobsRes = await api.get("/jobs");
      setJobs(jobsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Layout title="Dashboard" onLogout={logout}>
      {metrics && (
        <div className="metric-grid">
          <div className="metric-card">
            <div className="metric-top">
              <span className="metric-label">Total Jobs</span>
              <span className="metric-icon">
                <IconJobs />
              </span>
            </div>
            <div className="metric-value">{metrics.totalJobs}</div>
          </div>

          <div className="metric-card">
            <div className="metric-top">
              <span className="metric-label">Completed Jobs</span>
              <span className="metric-icon">
                <IconDashboard />
              </span>
            </div>
            <div className="metric-value">{metrics.completedJobs}</div>
          </div>

          <div className="metric-card">
            <div className="metric-top">
              <span className="metric-label">Queued Jobs</span>
              <span className="metric-icon">
                <IconQueues />
              </span>
            </div>
            <div className="metric-value">{metrics.queuedJobs}</div>
          </div>

          <div className="metric-card">
            <div className="metric-top">
              <span className="metric-label">DLQ Jobs</span>
              <span className="metric-icon">
                <IconInbox />
              </span>
            </div>
            <div className="metric-value">{metrics.dlqJobs}</div>
          </div>

          <div className="metric-card">
            <div className="metric-top">
              <span className="metric-label">Workers</span>
              <span className="metric-icon">
                <IconWorkers />
              </span>
            </div>
            <div className="metric-value">{metrics.workers}</div>
          </div>
        </div>
      )}

      <div className="panel">
        <div className="panel-header">
          <h2>Projects</h2>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Queues</h2>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Project ID</th>
            </tr>
          </thead>

          <tbody>
            {queues.map((queue) => (
              <tr key={queue.id}>
                <td>{queue.id}</td>
                <td>{queue.name}</td>
                <td>{queue.project_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Jobs</h2>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Retries</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.name}</td>

                <td>
                  <span className={`pill ${statusPillClass(job.status)}`}>
                    {job.status}
                  </span>
                </td>

                <td>{job.retry_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Dashboard;