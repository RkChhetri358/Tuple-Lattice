import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Row 1: Navbar */}
      <div className="layout-navbar">
        <Navbar />
      </div>

      {/* Row 2: Dynamic content */}
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
