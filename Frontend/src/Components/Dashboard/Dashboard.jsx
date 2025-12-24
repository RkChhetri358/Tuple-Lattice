import React, { useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {

  useEffect(() => {
    document.body.classList.add("has-transparent-navbar");
    return () => {
      document.body.classList.remove("has-transparent-navbar");
    };
  }, []);

  return (
    <>


    <div className="dashboard-container">
      hello Rachit
    </div>
    </>
  );
}
