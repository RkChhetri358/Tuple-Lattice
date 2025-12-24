import React, { useState, useEffect } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Uncomment and use this if you want to auto-redirect logged-in users
  /*
  useEffect(() => {
    const storedUser = localStorage.getItem("artist");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.admin_or_not) {
        navigate('/firstpage');
      }
    }
  }, [navigate]);
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Uncomment this to use real API login
      /*
      const response = await axios.post("http://localhost:8000/api/login/", {
        email: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        const userData = {
          email: response.data.email,
          artist_or_not: response.data.artist_or_not,
          firstName: response.data.first_name,
        };
        localStorage.setItem("artist", JSON.stringify(userData));

        if (response.data.admin_or_not) {
          navigate('/firstpage');
        } else {
          navigate('/addEvent');
        }
      }
      */
      // Temporary navigation for testing
      navigate('/layout/dashboard');
    } catch (err) {
      console.error("Error:", err.response || err.message);
      if (err.response) {
        setError(err.response.data.error || "Invalid credentials");
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError(err.message);
      }
    }
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
          {error && <p className="error-msg">{error}</p>}

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

          <div className="forgot-password">Forgot Password</div>

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
      </div>
    </div>
  );
};

export default Login;

