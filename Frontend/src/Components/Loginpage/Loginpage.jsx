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

<<<<<<< HEAD
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
=======
  // Redirect if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate('/layout/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      // 1. Call your Django API
      const response = await axios.post("http://localhost:8000/api/login/", {
        username: formData.username,
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
        password: formData.password,
      });

      if (response.status === 200) {
<<<<<<< HEAD
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
=======
        // 2. Extract data from your LoginView response
        const userData = {
          username: response.data.username,
          role: response.data.role,     // 'artist', 'distributor', or 'user'
          wallet: response.data.wallet, // Public address
          email: response.data.email,
        };

        // 3. Store in localStorage for global access
        localStorage.setItem("user", JSON.stringify(userData));

        // 4. Role-based navigation
        if (userData.role === "artist") {
          navigate('/layout/dashboard'); // Or specific artist dashboard
        } else {
          navigate('/layout/dashboard'); // Standard view
        }
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      if (err.response) {
        setError(err.response.data.error || "Invalid username or password");
      } else {
        setError("Cannot connect to server. Please try again.");
      }
    }
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
  };

  /* 🔐 SOCIAL LOGIN REDIRECTS (Kept as requested) */
  const googleLogin = () => window.location.href = "https://accounts.google.com/o/oauth2/v2/auth";
  const facebookLogin = () => window.location.href = "https://www.facebook.com/v18.0/dialog/oauth";
  const discordLogin = () => window.location.href = "https://discord.com/oauth2/authorize";

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/UTA.png" alt="UTA Logo" className="logo" />
          <h2>Welcome Back</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
<<<<<<< HEAD
          {error && <p className="error-msg">{error}</p>}
=======
          {error && <p className="error-msg" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
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
                placeholder="••••••••"
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

<<<<<<< HEAD
          <div className="forgot-password">Forgot Password</div>
=======
          <div className="forgot-password">Forgot Password?</div>
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-login">
          <button className="social-btn" onClick={googleLogin}>
<<<<<<< HEAD
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
=======
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" height="20" />
          </button>
          <button className="social-btn" onClick={facebookLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" height="20" />
          </button>
          <button className="social-btn" onClick={discordLogin}>
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" alt="Discord" height="20" />
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
          </button>
        </div>
      </div>
    </div>
  );
};
<<<<<<< HEAD

export default Login;

=======

export default Login;
>>>>>>> 44c70842e6f047090fa0cbcf3df7ba3b1b947024
