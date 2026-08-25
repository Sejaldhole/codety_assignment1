// Minimal inline icon set — no external icon-library dependency required.
// Every icon takes normal SVG props (className, style, etc.) if needed.

export const IconLogo = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M4 12l4-8h8l4 8-4 8H8l-4-8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.4" fill="currentColor" />
  </svg>
);

export const IconDashboard = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const IconProjects = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconQueues = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="4" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="10" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="16" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const IconJobs = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconWorkers = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M2.5 20a5.5 5.5 0 0111 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="2" />
    <path d="M14.7 20a4.3 4.3 0 018.3-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconSun = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const IconMoon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M20 14.5A8.5 8.5 0 1110 3.5a6.8 6.8 0 0010 11z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconLogout = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconMenu = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconInbox = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M3 12l3-8h12l3 8v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M3 12h5l1.5 3h5L16 12h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);