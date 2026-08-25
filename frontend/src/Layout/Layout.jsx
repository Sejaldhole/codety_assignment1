import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/Themecontext";
import {
  IconSun,
  IconMoon,
  IconLogout,
  IconMenu,
} from "../components/Icons";

import "../styles/Theme.css";

/**
 * Layout wraps every authenticated page with the sidebar + topbar chrome.
 * It does not touch routing, auth, or data — `onLogout` is passed in from
 * the page so existing logout logic stays exactly where it was.
 */
function Layout({ title, onLogout, children }) {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="btn-icon hamburger"
              aria-label="Toggle navigation"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <IconMenu />
            </button>
            <h1 className="topbar-title">{title}</h1>
          </div>

          <div className="topbar-right">
            <button
              className="btn-icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <IconSun /> : <IconMoon />}
            </button>

            {onLogout && (
              <button className="btn" onClick={onLogout}>
                <IconLogout />
                Logout
              </button>
            )}
          </div>
        </header>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;