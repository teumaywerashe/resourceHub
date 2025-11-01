import React from "react";
import { assets } from "../../asset/assets";
import "./uniNav.css";
// import { useNavigate } from "react-router-dom";
function UniNav() {
  // const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div className="left-navbar">
        <img src={assets.logo} alt="" />
      </div>
      <div className="center-navbar">
        {" "}
        <ul>
          <li>home</li>
          <li>departments</li>
          <li>collages</li>
          <li>announcment</li>
          <li>resource</li>
        </ul>
      </div>
      <div className="right-navbar">
        <button>portal</button>
      </div>
    </div>
  );
}

export default UniNav;
