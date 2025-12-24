import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
       <section className="welcome-section">
        <p className="welcome-text">Welcome</p>

        <h1 className="welcome-name">
          Mr. Yadav<span>,</span>
        </h1>

        <p className="welcome-role">
          Senior Musician | Writer | Creator
        </p>
      </section>
      <div className="dashboardmiddle">2</div>
      <section className="stats-section">
        <div className="stat-item">
          <h2>3</h2>
          <p>releases</p>
        </div>

        <div className="stat-item">
          <h2>4.2k</h2>
          <p>reach</p>
        </div>

        <div className="stat-item">
          <h2>2k</h2>
          <p>sales</p>
        </div>
      </section>
    </div>
  );
}
