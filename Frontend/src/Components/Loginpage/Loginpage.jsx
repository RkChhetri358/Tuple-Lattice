import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-page">
      {/* Top Section */}
      <div className="top-section">
        {/* Balance Card */}
        <div className="balance-card">
          <p className="balance-title">Total Balance</p>
          <h2>Rs 13,000.67</h2>
          <span className="pending">pending Rs. 0.0</span>
        </div>

        {/* User Info */}
        <div className="user-info">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="profile-img"
          />
          <h4>Suresh Gupa</h4>
          <p className="verified">verified artist</p>
          <small>
            I share music here with clear ownership, fair value, and respect
            for the creators.
          </small>
        </div>
      </div>

      {/* Revenue Distribution */}
      <div className="revenue-card">
        <h3>Revenue Distribution</h3>

        <div className="revenue-item">
          <div className="label">
            <span>Distributor</span>
            <span className="percent red">60%</span>
          </div>
          <div className="bar">
            <div className="fill red" style={{ width: "60%" }}></div>
          </div>
          <p>Rs 12,000</p>
        </div>

        <div className="revenue-item">
          <div className="label">
            <span>Collaborator</span>
            <span className="percent orange">30%</span>
          </div>
          <div className="bar">
            <div className="fill orange" style={{ width: "30%" }}></div>
          </div>
          <p>Rs 3,000</p>
        </div>

        <div className="revenue-item">
          <div className="label">
            <span>Platform</span>
            <span className="percent gray">10%</span>
          </div>
          <div className="bar">
            <div className="fill gray" style={{ width: "10%" }}></div>
          </div>
          <p>Rs 1,000</p>
        </div>

        <small className="note">
          * Smart contract automatically distributes funds on each sale
        </small>
      </div>
    </div>
  );
};

export default Profile;
