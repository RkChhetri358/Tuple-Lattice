import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LandingPage.css";
import UTA from "../Pictures/UTA.png";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // important
      easing: "ease-out-cubic",
    });

    // TOTAL TIME CALCULATION
    // CSS delay: 8s
    // CSS animation: 14s
    // Fade-out buffer: 1s
    const totalTime = 2000;

    const timer = setTimeout(() => {
      navigate('/home')
    }, totalTime);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-page">
      <div className="logo-reveal">
        <img src={UTA} className="logo-img" alt="UTA logo" />
      </div>

      <h1 className="headline" >
        Unblock The Artist
      </h1>
    </div>
  );
}
