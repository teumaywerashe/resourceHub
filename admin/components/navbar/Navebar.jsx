import React from "react";
import {LogOut} from 'lucide-react'
import "./Navebar.css";
import { assets } from "../../../frontend/src/asset/assets";

import { useNavigate } from "react-router-dom";

function Navebar({ setShowLogin }) {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };
  const adminToken = localStorage.getItem("adminToken");
  console.log(adminToken);
  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="nav-logo">
         <a href="/"><img src={assets.logo} alt="" className="logo" /></a> 
        </div>
        {/* <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#faculties">Faculties</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul> */}
        {adminToken ? (
          <>
            {" "}
            <img className="pro-logo" src={assets.profile_icon} />
            <button onClick={logout}><Logout />logout</button>
            


          </>
        ) : (
          <button onClick={() => setShowLogin(true)} className="login-btn">
            Login
          </button>
        )}
      </nav>
    </div>
  );
}

export default Navebar;
