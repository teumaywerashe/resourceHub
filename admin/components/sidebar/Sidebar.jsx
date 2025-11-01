import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { assets } from "../../../frontend/src/asset/assets.js";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/" className="sidebar-option">
          <img src={assets.first_generation} alt="" />
          <p>University Info</p>
        </NavLink>
        <NavLink to="/campus" className="sidebar-option">
          <img src={assets.third_generation} alt="" />
          <p>Campus Info</p>
        </NavLink>
        <NavLink to="/resources" className="sidebar-option">
          <img src={assets.second_generation} alt="" />
          <p>Resorces</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
