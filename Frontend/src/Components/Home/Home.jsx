import { useEffect, useRef } from "react";
import homepic from "../Pictures/Homepic.png";
import logopic from "../Pictures/UTA_full.png";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left; // fixed from rect.right
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 18;
      const rotateY = (x - centerX) / 18;

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    };

    const reset = () => {
      card.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
      `;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div className="homecontainer">
      <div className="left">
        <div ref={cardRef} className="card">
          <img src={homepic} alt="Homepic" />
        </div>
      </div>

      <div className="right">
        <div className="rightbox">
          <div className="rightbox1">
            <img src={logopic} className="logopic" alt="Logo" />
          </div>
          <div className="rightbox2">
            <div className="textrightbox2up">Art. Owned.</div>
            <div className="textrightbox2down">
              Your work. Your rules. Your revenue.
            </div>
          </div>
          <div className="rightbox3">
            <Link to="/login">
              <button
                className="getstarted"
                style={{
                  padding: "23px 90px",
                  fontSize: "16px",
                  borderRadius: "100px",
                }}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
