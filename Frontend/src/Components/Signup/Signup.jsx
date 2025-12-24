import React, { useState } from "react";
import "./Signup.css";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======

>>>>>>> 9a2f13eac61292fb4e6449cc7d84500943712797
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Signup successful (demo)");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* LOGO */}
        <div className="signup-header">
          <img src="/UTA.png" alt="UTA Logo" className="logo" />
        </div>

        {/* FORM */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
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
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button className="signup-btn" type="submit">
            Create Account
          </button>
        </form>

        {/* LOGIN LINK */}
        <div className="login-link">
          Already have an account?{" "}
<<<<<<< HEAD
         
            <Link to="/login"  onClick={() => alert("Redirect to Login page")}>Login</Link>
          
=======
          <span onClick={() => alert("Redirect to Login page")}>
            Login
          </span>
>>>>>>> 9a2f13eac61292fb4e6449cc7d84500943712797
        </div>

        {/* TERMS */}
        <div className="terms-condition">
          By continuing, you agree to UTA's
          <span> Terms of Use </span>
          and
          <span> Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
