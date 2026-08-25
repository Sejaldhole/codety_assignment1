import Layout from "../Layout/Layout";
import { IconWorkers } from "../components/Icons";

function Workers() {
  return (
    <Layout title="Workers">
      <div className="empty-state">
        <div className="empty-state-icon">
          <IconWorkers />
        </div>
        <div className="empty-state-title">Workers</div>
        <p className="empty-state-text">
          Worker heartbeat status will appear here.
        </p>
      </div>
    </Layout>
  );
}

export default Workers;