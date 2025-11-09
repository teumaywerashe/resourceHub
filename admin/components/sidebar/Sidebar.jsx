import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { assets } from "../../../frontend/src/asset/assets.js";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink 
          to="/add" 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.first_generation} alt="Update University" />
          <p>Update University</p>
        </NavLink>

        <NavLink 
          to="/campus" 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.third_generation} alt="Update Campuses" />
          <p>Update Campuses</p>
        </NavLink>

        <NavLink 
          to="/resources" 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.second_generation} alt="Resources" />
          <p>Resources</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
