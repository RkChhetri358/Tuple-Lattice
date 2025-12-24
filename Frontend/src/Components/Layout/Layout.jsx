import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";

const Layout = () => {
  const isTransparent = document.body.classList.contains("has-transparent-navbar");

  return (
    <div className="layout-container">
      <div className={`layout-navbar ${isTransparent ? "transparent" : ""}`}>
        <Navbar />
      </div>

      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
