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
<<<<<<< HEAD
    wallet_address: "", // Updated to match Django model
    role: "user",
=======
    wallet: "",
    privateAddress: "",
    role: "user", // 👈 default role
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/", // Ensure this matches your urls.py
        formData
      );

      if (response.status === 201) {
        alert("Signup Successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        // Show specific error from Django (e.g., "Username already taken")
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("Server is unreachable. Check if Django is running.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <img src="/UTA.png" alt="UTA Logo" className="logo" />
          <h2>Create Account</h2>
        </div>
<br />
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* ROLE SELECTION */}
          <div className="form-group">
<<<<<<< HEAD
            <label id="role-label">SELECT ROLE</label>
            <div className="role-options">
              <label className={formData.role === "artist" ? "active" : ""}>
=======
            <label>Choose Role</label>
            <div className="role-options">
              <label>
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
                <input
                  type="radio"
                  name="role"
                  value="artist"
                  checked={formData.role === "artist"}
                  onChange={handleChange}
                />
                Artist
              </label>

<<<<<<< HEAD
              <label className={formData.role === "distributor" ? "active" : ""}>
=======
              <label>
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
                <input
                  type="radio"
                  name="role"
                  value="distributor"
                  checked={formData.role === "distributor"}
                  onChange={handleChange}
                />
                Distributor
              </label>

<<<<<<< HEAD
              <label className={formData.role === "user" ? "active" : ""}>
=======
              <label>
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
<<<<<<< HEAD
                Collector
=======
                User
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Dave"
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
              placeholder="name@example.com"
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
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Public Wallet Address</label>
            <input
              type="text"
              name="wallet_address"
              placeholder="0x..."
              value={formData.wallet_address}
              onChange={handleChange}
              required
            />
            <small style={{ color: "#888", fontSize: "11px" }}>
              Never enter your private key here.
            </small>
          </div>

          <button className="signup-btn" type="submit">
            Create Account
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
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