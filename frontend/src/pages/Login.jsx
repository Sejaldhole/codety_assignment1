import { useState } from "react";
import api from "../services/api";
import { useTheme } from "../context/Themecontext";
import { IconLogo, IconSun, IconMoon } from "../components/Icons";
import "../styles/theme.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useTheme();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-shell">
      <button
        className="btn-icon auth-theme-toggle"
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        {theme === "dark" ? <IconSun /> : <IconMoon />}
      </button>

      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand-mark">
            <IconLogo />
          </div>
          <div className="sidebar-brand-text" style={{ color: "var(--text-primary)" }}>
            Job Scheduler
          </div>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to view your scheduler dashboard.</p>

        <form onSubmit={login}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              className="input"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;