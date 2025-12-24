import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Loginpage.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // After login, navigate to Layout (Dashboard by default)
    navigate("/layout");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/UTA.png" alt="UTA Logo" className="logo" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username or Email</label>
            <input
              type="text"
              name="username"
              placeholder="Username or email"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter at least 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                👁
              </span>
            </div>
          </div>

          <div className="forgot-password">Forgot Password</div>

          <button className="login-btn" type="submit">Login</button>
        </form>

        <div className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
