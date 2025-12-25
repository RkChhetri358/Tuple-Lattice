import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
<<<<<<< HEAD
    const navigate = useNavigate();
=======
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853

  useEffect(() => {
    if (location.pathname === "/layout/asset") {
      const container = document.querySelector(".assets-page");

      const handleScroll = () => {
        if (container) {
          setScrolled(container.scrollTop > 50); // threshold
        }
      };

      if (container) {
        container.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (container) {
          container.removeEventListener("scroll", handleScroll);
        }
      };
    } else {
      setScrolled(false); // transparent on other pages
    }
  }, [location.pathname]);

<<<<<<< HEAD
const handlenavigate=()=>{
   localStorage.clear();
   navigate('/home');
}

=======
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
  return (
    <nav className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      {/* LEFT */}
      <div className="navleft">
        <div className="nav-logo">
<<<<<<< HEAD
          <img src="/UTA.png" alt="UTA Logo" onClick={handlenavigate} />
=======
          <img src="/UTA.png" alt="UTA Logo" />
>>>>>>> e1e3ec44c5923bf6e0a54955529838e351b64853
        </div>
      </div>

      {/* CENTER */}
      <div className="navcenter">
        <ul className="navbar-menu">
          <li>
            <NavLink
              to="/layout/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/layout/asset"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Assets
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/layout/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navright">
        {location.pathname === "/layout/asset" && (
          <div className="nav-search">
            <input type="text" placeholder="Search..." />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;