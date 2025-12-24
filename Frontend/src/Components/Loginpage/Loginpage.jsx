<<<<<<< HEAD
import React, { useState } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/layout/dashboard"); // change to "/home" if needed
  };

  /* 🔐 SOCIAL LOGIN REDIRECTS */
  const googleLogin = () => {
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth";
  };

  const facebookLogin = () => {
    window.location.href = "https://www.facebook.com/v18.0/dialog/oauth";
  };

  const discordLogin = () => {
    window.location.href = "https://discord.com/oauth2/authorize";
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/UTA.png" alt="UTA Logo" className="logo" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username or email</label>
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
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>
            </div>
          </div>

        




          <div className="forgot-password">
            Forgot Password
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>
      <div className="social-login">
  <button className="social-btn" onClick={googleLogin}>
    <img
      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
      alt="Google"
      height="20"
    />
  </button>

  <button className="social-btn" onClick={facebookLogin}>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
      alt="Facebook"
      height="20"
    />
  </button>

  <button className="social-btn" onClick={discordLogin}>
    <img
      src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
      alt="Discord"
      height="20"
    />
  </button>
</div>
    
        {/* SIGNUP */} <div className="signup-link"> Don’t have an account?{" "} <span onClick={() => alert("Redirect to Sign Up page")}>Sign up</span> </div> <div className="terms-condition"> By continuing, you agree to UTA's <span>Terms of Use</span> and <span>Privacy Policy</span> </div> </div> </div> ); }; export default Login;
=======
import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-page">
      {/* Top Section */}
      <div className="top-section">
        {/* Balance Card */}
        <div className="balance-card">
          <p className="balance-title">Total Balance</p>
          <h2>Rs 13,000.67</h2>
          <span className="pending">pending Rs. 0.0</span>
        </div>

        {/* User Info */}
        <div className="user-info">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="profile-img"
          />
          <h4>Suresh Gupa</h4>
          <p className="verified">verified artist</p>
          <small>
            I share music here with clear ownership, fair value, and respect
            for the creators.
          </small>
        </div>
      </div>

      {/* Revenue Distribution */}
      <div className="revenue-card">
        <h3>Revenue Distribution</h3>

        <div className="revenue-item">
          <div className="label">
            <span>Distributor</span>
            <span className="percent red">60%</span>
          </div>
          <div className="bar">
            <div className="fill red" style={{ width: "60%" }}></div>
          </div>
          <p>Rs 12,000</p>
        </div>

        <div className="revenue-item">
          <div className="label">
            <span>Collaborator</span>
            <span className="percent orange">30%</span>
          </div>
          <div className="bar">
            <div className="fill orange" style={{ width: "30%" }}></div>
          </div>
          <p>Rs 3,000</p>
        </div>

        <div className="revenue-item">
          <div className="label">
            <span>Platform</span>
            <span className="percent gray">10%</span>
          </div>
          <div className="bar">
            <div className="fill gray" style={{ width: "10%" }}></div>
          </div>
          <p>Rs 1,000</p>
        </div>

        <small className="note">
          * Smart contract automatically distributes funds on each sale
        </small>
      </div>
    </div>
  );
};

export default Profile;
>>>>>>> 9a2f13eac61292fb4e6449cc7d84500943712797
