import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css"; // make sure this points to your CSS file
import { NavLink } from "react-router-dom"; 

export default function Navbar() {
  return (
    <div className="navbar-container">
       <div className="navleft">
        <div className="nav-logo">
          <img src="/UTA.png" alt="UTA Logo" />
        </div>
      </div>
      <div className="navcenter">
      
        <ul className="navbar-menu">
          <li>
            <NavLink
               to="/layout/dashboard"
  className={({ isActive }) => (isActive ? "active" : "")}
            >
              DASHBOARD
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/assets"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ASSETS
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              PROFILE
            </NavLink>
          </li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navright">
        <div className="nav-search">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search something..." />
        </div>  
      </div>

    </div>
  );
}
