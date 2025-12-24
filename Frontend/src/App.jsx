import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Loginpage/Loginpage";
// import Home from "./components/Home/Home";
// import Signup from "./components/Signup/Signup";
// import Navbar from "./components/Navbar/Navbar";
import Assets from "./components/Assets/Assets";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/navbar" element={<Navbar />} />

      </Routes>
    </Router>
  );
}

export default App;
