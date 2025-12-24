import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    wallet: "",
    privateAddress: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/Backend/UTB/signup/",
        formData
      );

      if (response.status === 201) {
        alert("Signup Successful");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        alert("No response from server. Please try again later.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <img src="/UTA.png" alt="UTA Logo" className="logo" />
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
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
              required
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
                required
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
            <label>Add Wallet</label>
            <input
              type="text"
              name="wallet"
              placeholder="Enter wallet address"
              value={formData.wallet}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Private Address</label>
            <input
              type="text"
              name="privateAddress"
              placeholder="Enter private address"
              value={formData.privateAddress}
              onChange={handleChange}
            />
          </div>

          <button className="signup-btn" type="submit">
            Create Account
          </button>
        </form>

        <div className="login-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>

        <div className="terms-condition">
          By continuing, you agree to UTA's
          <span> Terms of Use </span> and
          <span> Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
