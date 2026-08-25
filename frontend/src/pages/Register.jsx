import { useState } from "react";
import api from "../services/api";
import { useTheme } from "../context/Themecontext";
import { IconLogo, IconSun, IconMoon } from "../components/Icons";
import "../styles/theme.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useTheme();

  const register = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");

      window.location.href = "/";
    } catch (err) {
      alert("Registration Failed");
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

        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">Set up access to the scheduler console.</p>

        <form onSubmit={register}>
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">
              Name
            </label>
            <input
              id="register-name"
              className="input"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              className="input"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;