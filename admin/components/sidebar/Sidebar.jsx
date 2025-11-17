import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
// import { assets } from "../../../frontend/src/asset/assets.js";
import { BookImage, Building2, University,NewspaperIcon } from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <University size={28} />
          <p>Update University</p>
        </NavLink>

        <NavLink
          to="/campus"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <span>
            <Building2 size={28} />
          </span>
          <p>Update Campuses</p>
        </NavLink>

        <NavLink
          to="/resources"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <BookImage size={28} />
          <p>Resources</p>
        </NavLink>
          <NavLink
          to="/news"
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option"
          }
        >
          <span>
            <NewspaperIcon size={28} />
          </span>
          <p>news</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
