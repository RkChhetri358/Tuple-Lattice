import React, { useState, useEffect } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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
        password: formData.password,
      });

      if (response.status === 200) {
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
          {error && <p className="error-msg" style={{color: 'red', textAlign: 'center'}}>{error}</p>}

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

          <div className="forgot-password">Forgot Password?</div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-login">
          <button className="social-btn" onClick={googleLogin}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" height="20" />
          </button>
          <button className="social-btn" onClick={facebookLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" height="20" />
          </button>
          <button className="social-btn" onClick={discordLogin}>
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" alt="Discord" height="20" />
          </button>
        </div>
         <div className="signup-link"> Don’t have an account?<Link to="/signup"> Sign up</Link>
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

export default Login;
