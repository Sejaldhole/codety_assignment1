import Layout from "../Layout/Layout";
import { IconJobs } from "../components/Icons";

function Jobs() {
  return (
    <Layout title="Jobs">
      <div className="empty-state">
        <div className="empty-state-icon">
          <IconJobs />
        </div>
        <div className="empty-state-title">Jobs</div>
        <p className="empty-state-text">
          Job execution history will appear here.
        </p>
      </div>
    </Layout>
  );
}

export default Jobs;