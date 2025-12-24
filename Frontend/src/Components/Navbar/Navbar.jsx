import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navleft">
        <div className="nav-logo">
          <img src="/UTA.png" alt="UTA Logo" />
        </div>
      </div>

      <div className="navcenter">
        <ul className="navbar-menu">
          <li>
            <NavLink to="/layout/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
              Dashboard
            </NavLink>
          </li>
          <li>
  <NavLink
    to="/asset"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    Assets
  </NavLink>
</li>

          <li>
            <NavLink to="/layout/profile" className={({ isActive }) => isActive ? "active" : ""}>
              Profile
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navright">
        <div className="nav-search">
          <input type="text" placeholder="Search..." />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
