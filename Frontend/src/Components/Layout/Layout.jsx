import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* FIXED NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
