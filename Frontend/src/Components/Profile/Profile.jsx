import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import RevenueChart from "../RevenueChart/RevenueChart";
import "./Profile.css";

export default function Profile() {
  const revenueData = [
    { title: "Distributor", percent: 60, amount: "Rs. 12,000" },
    { title: "Collaborator", percent: 30, amount: "Rs. 3,000" },
    { title: "Platform", percent: 10, amount: "Rs. 1,000" },
  ];

  const [animatedPercent, setAnimatedPercent] = useState([0, 0, 0]);

  useEffect(() => {
    let animationFrame;
    const duration = 1000; // 1 second
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setAnimatedPercent(
        revenueData.map((item) => Math.floor(item.percent * progress))
      );
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-grid">
        {/* LEFT COLUMN */}
        <div className="left-col">
          <div className="balance-card">
            <div className="balance-top">
              <span>Total Balance</span>
              <span className="wallet-icon">
                <FontAwesomeIcon icon={faWallet} />
              </span>
            </div>
            <h1 className="balance-amount">Rs 13,000.67</h1>
            <p className="pending-text">pending Rs. 0.0</p>
          </div>

          <div className="chart-box">
            <RevenueChart />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-col">
          <div className="profile-row">
            <img src="/profile.png" className="profile-img" alt="artist" />
            <div className="profile-text">
              <p>
                “I share my work here with clear ownership, fair value, and
                respect for the creative process.”
              </p>
              <h3>Arun Yadav</h3>
              <span>verified artist</span>
            </div>
          </div>

          {/* REVENUE CARD */}
          <div className="revenue-card">
            <h2>Revenue Distribution</h2>
            {revenueData.map((item, idx) => (
              <div className="rev-item" key={idx}>
                <span className="rev-title">{item.title}</span>
                <div className="bar">
                  <div
                    style={{ width: `${animatedPercent[idx]}%` }}
                    className="bar-fill"
                  />
                </div>
                <div className="right">
                  <span className="percent">{animatedPercent[idx]}%</span>
                  <span className="amount">{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
