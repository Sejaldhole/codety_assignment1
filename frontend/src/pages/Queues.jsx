import Layout from "../Layout/Layout";
import { IconQueues } from "../components/Icons";

function Queues() {
  return (
    <Layout title="Queues">
      <div className="empty-state">
        <div className="empty-state-icon">
          <IconQueues />
        </div>
        <div className="empty-state-title">Queues</div>
        <p className="empty-state-text">All queues will appear here.</p>
      </div>
    </Layout>
  );
}

export default Queues;