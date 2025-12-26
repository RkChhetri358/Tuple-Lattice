import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Video3DCarousel from "../Carousel/Video3DCarousel";

export default function Dashboard() {
  // --- STATE FOR DYNAMIC USERNAME ---
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    document.body.classList.add("has-transparent-navbar");

    // --- FETCH USERNAME FROM LOCALSTORAGE ---
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setUserName(storedUser.username);
    }

    return () => {
      document.body.classList.remove("has-transparent-navbar");
    };
  }, []);

  const stats = [
    { label: "releases", value: 3 },
    { label: "reach", value: 4200 },
    { label: "sales", value: 2000 },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    let animationFrame;
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);

      const newCounts = stats.map((stat) =>
        Math.floor(stat.value * progress)
      );
      setCounts(newCounts);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Fixed the typo 'sec  tion' to 'section' */}
      <section className="welcome-section">
        <p className="welcome-text">Welcome</p>
        <h1 className="welcome-name">
          {/* DYNAMIC USERNAME INSERTED HERE */}
          Mr. {userName}<span>,</span>
        </h1>
        <p className="welcome-role">Senior Musician | Writer | Creator</p>
      </section>

      <div className="dashboardmiddle">
        <Video3DCarousel />
      </div>

      <section className="stats-section">
        {stats.map((stat, idx) => (
          <div className="stat-item" key={idx}>
            <h2>
              {counts[idx] >= 1000 
                ? `${(counts[idx] / 1000).toFixed(1)}k` 
                : counts[idx]}
            </h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}