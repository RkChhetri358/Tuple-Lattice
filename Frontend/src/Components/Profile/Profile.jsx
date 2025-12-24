import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import RevenueChart from "../RevenueChart/RevenueChart";

export default function Profile() {
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

          <div className="profile-row">
            <img
              src="/profile.png"
              className="profile-img"
              alt="artist"
            />
            <div className="profile-text">
              <p>
                “I share my work here with clear ownership, fair value, and
                respect for the creative process.”
              </p>
              <h3>Suresh Gupa</h3>
              <span>verified artist</span>
            </div>
          </div>

          <div className="revenue-card">
            <h2>Revenue Distribution</h2>

            <div className="rev-item">
              <span>Distributor</span>
              <div className="bar">
                <div style={{ width: "60%" }} />
              </div>
              <span className="right">
                60% <br /> Rs. 12,000
              </span>
            </div>

            <div className="rev-item">
              <span>Collaborator</span>
              <div className="bar">
                <div style={{ width: "30%" }} />
              </div>
              <span className="right">
                30% <br /> Rs. 3,000
              </span>
            </div>

            <div className="rev-item">
              <span>Platform</span>
              <div className="bar">
                <div style={{ width: "10%" }} />
              </div>
              <span className="right">
                10% <br /> Rs. 1,000
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
