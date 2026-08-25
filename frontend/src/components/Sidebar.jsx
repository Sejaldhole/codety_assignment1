import {
  IconLogo,
  IconDashboard,
  IconProjects,
  IconQueues,
  IconJobs,
  IconWorkers,
} from "./Icons";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: IconDashboard },
  { href: "/projects", label: "Projects", icon: IconProjects },
  { href: "/queues", label: "Queues", icon: IconQueues },
  { href: "/jobs", label: "Jobs", icon: IconJobs },
  { href: "/workers", label: "Workers", icon: IconWorkers },
];

function Sidebar({ open, onNavigate }) {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <>
      {open && <div className="sidebar-scrim" onClick={onNavigate} />}

      <aside className={`sidebar${open ? " open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">
            <IconLogo />
          </div>
          <div>
            <div className="sidebar-brand-text">Job Scheduler</div>
            <div className="sidebar-brand-sub">v1 · console</div>
          </div>
        </div>

        <ul className="sidebar-nav">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = currentPath === href;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-item${isActive ? " active" : ""}`}
                  onClick={onNavigate}
                >
                  <Icon />
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;