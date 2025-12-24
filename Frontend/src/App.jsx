import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
// import Login from "./components/Loginpage/Loginpage";
import Login from "./Components/Loginpage/Loginpage";
import Signup from "./components/Signup/Signup";

import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";



import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
// import AddAsset from "./components/AddAsset/AddAsset";
import Assets from "./Components/Assets/Assets";
import AddAsset from "./Components/AddAsset/AddAsset";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addasset" element={<AddAsset />} />

       
        <Route path="/layout" element={<Layout />}>
          <Route index element={<Dashboard />} />            
          <Route path="dashboard" element={<Dashboard />} /> 
         
          <Route path="assets" element={<Assets />} />
          <Route path="profile" element={<Profile />} />
       
        </Route>

      
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
