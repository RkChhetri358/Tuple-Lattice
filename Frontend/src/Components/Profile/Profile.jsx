import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import RevenueChart from "../RevenueChart/RevenueChart";
import "./Profile.css";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [animatedPercent, setAnimatedPercent] = useState([0, 0, 0]);
  const [loading, setLoading] = useState(true);

  // Fallback data from localStorage for instant UI feedback
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedUser?.wallet) {
          const res = await axios.get(`http://127.0.0.1:8000/api/profile/${storedUser.wallet}/`);
          setProfileData(res.data);
          
          if (res.data.revenue_stats) {
            animateBars(res.data.revenue_stats);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const animateBars = (data) => {
    const duration = 1000;
    const startTime = performance.now();
    
    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setAnimatedPercent(data.map((item) => Math.floor(item.percent * progress)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

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
            <h1 className="balance-amount">
                {loading ? "Calculating..." : (profileData?.balance || "Rs. 0.00")}
            </h1>
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
              {/* Show stored name immediately, then update with API data */}
              <h3>{profileData?.username || storedUser?.username || "Loading..."}</h3>
              <span>{profileData?.role || storedUser?.role || "Verified Artist"}</span>
            </div>
          </div>

          <div className="revenue-card">
            <h2>Revenue Distribution</h2>
            {(profileData?.revenue_stats || []).map((item, idx) => (
              <div className="rev-item" key={idx}>
                <span className="rev-title">{item.title}</span>
                <div className="bar">
                  <div
                    style={{ width: `${animatedPercent[idx] || 0}%` }}
                    className="bar-fill"
                  />
                </div>
                <div className="right">
                  <span className="percent">{animatedPercent[idx] || 0}%</span>
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