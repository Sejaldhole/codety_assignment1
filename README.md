# Distributed Job Scheduler — Dashboard

A React admin dashboard for monitoring a distributed job scheduler — projects, queues, jobs, and worker status, with live metrics polling.

## Features

- Live dashboard with job/queue/worker metrics (auto-refreshes every 5s)
- Projects, Queues, Jobs, and Workers views
- Login / Register auth flow
- Dark & light theme toggle
- Responsive sidebar navigation
- Status-coded job pills (completed, queued, failed/DLQ, running)

## Tech Stack

- React + React Router
- Plain CSS (custom design system, no UI framework)

## Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# build for production
npm run build
```

## Project Structure

```
src/
├── components/     # Sidebar, Layout, Icons
├── context/        # ThemeContext (dark/light mode)
├── pages/          # Login, Register, Dashboard, Projects, Queues, Jobs, Workers
├── services/       # API client
├── styles/         # theme.css (design tokens + component styles)
├── App.jsx         # routes
└── main.jsx        # app entry point
```

## Environment / API

Update `src/services/api.js` with your backend base URL. The dashboard expects these endpoints:

- `GET /metrics`
- `GET /projects`
- `GET /queues`
- `GET /jobs`
- `POST /auth/login`
- `POST /auth/register`

## License

MIT
