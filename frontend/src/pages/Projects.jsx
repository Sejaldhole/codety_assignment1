import Layout from "../Layout/Layout";
import { IconProjects } from "../components/Icons";

function Projects() {
  return (
    <Layout title="Projects">
      <div className="empty-state">
        <div className="empty-state-icon">
          <IconProjects />
        </div>
        <div className="empty-state-title">Projects</div>
        <p className="empty-state-text">
          All scheduler projects will appear here.
        </p>
      </div>
    </Layout>
  );
}

export default Projects;