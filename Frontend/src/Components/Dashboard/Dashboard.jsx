import React, { useEffect } from "react";
import "./Dashboard.css";
import Video3DCarousel from "../Carousel/Video3DCarousel ";


export default function Dashboard() {
  useEffect(() => {
    document.body.classList.add("has-transparent-navbar");
    return () => {
      document.body.classList.remove("has-transparent-navbar");
    };
  }, []);

    
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
      
      <div className="dashboardmiddle">
          <Video3DCarousel/>
      </div>
      
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