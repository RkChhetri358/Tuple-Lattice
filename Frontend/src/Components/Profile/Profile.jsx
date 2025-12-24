import React, { useEffect, useState } from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import RevenueChart from "../RevenueChart/RevenueChart";

export default function Profile() {
  const revenueData = [
    { label: "Distributor", percent: 60, amount: "Rs. 12,000" },
    { label: "Collaborator", percent: 30, amount: "Rs. 3,000" },
    { label: "Platform", percent: 10, amount: "Rs. 1,000" },
  ];

  // Animated progress bars
  const [animatedPercents, setAnimatedPercents] = useState(
    revenueData.map(() => 0)
  );

  useEffect(() => {
    const timers = revenueData.map((item, index) => {
      return setTimeout(() => {
        setAnimatedPercents((prev) => {
          const updated = [...prev];
          updated[index] = item.percent;
          return updated;
        });
      }, 300 * index); // stagger animation
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [revenueData]);

  return (
    <div className="profile-container">
      <div className="profile-grid">

        {/* LEFT COLUMN */}
        <div className="left-col">

          {/* BALANCE CARD */}
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

          {/* CHART CARD */}
          <div className="chart-box">
            <RevenueChart />
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="right-col">

          {/* PROFILE INFO */}
          <div className="profile-row">
            <img src="/profile.png" className="profile-img" alt="artist" />
            <div className="profile-text">
              <p>
                “I share my work here with clear ownership, fair value, and
                respect for the creative process.”
              </p>
              <h3>Suresh Gupa</h3>
              <span>verified artist</span>
            </div>
          </div>

          {/* REVENUE DISTRIBUTION */}
          <div className="revenue-card">
            <h2>Revenue Distribution</h2>

            {revenueData.map((item, index) => (
              <div className="rev-item" key={index}>
                <span>{item.label}</span>

                <div className="bar">
                  <div
                    className="bar-fill"
                    style={{ width: `${animatedPercents[index]}%` }}
                  />
                </div>

                <span className="right">
                  {item.percent}% <br /> {item.amount}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
