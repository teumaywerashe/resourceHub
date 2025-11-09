import React, { useContext, useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import "./Navebar.css";
import { assets } from "../../../frontend/src/asset/assets";

import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../frontend/src/context/store";

function Navebar({ setShowLogin }) {
  const navigate = useNavigate();
  const logoutProfile = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("uniId");
    navigate("/login");
  };
  const { getUniversity, currentUniversity } = useContext(StoreContext);
  const adminToken = localStorage.getItem("adminToken");
  // const [showLogOut, setShowLogOut] = useState(false);
  const uniId = localStorage.getItem("uniId");
  useEffect(() => {
    getUniversity(uniId);
  }, []);
  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="nav-logo">
          <a href="/">
            <img src={assets.logo} alt="jf" className="logo" />
          </a>
        </div>
        <div>
          {uniId ? (
            <h1 className="uni-name">{currentUniversity.name}</h1>
          ) : (
            <></>
          )}
        </div>
        <div>
          {adminToken ? (
            <div className="profile">
              <img className="pro-logo" src={assets.profile_icon} />
              <button onClick={logoutProfile} className="logout">
                <LogOut />
                logout
              </button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="login-btn">
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navebar;
