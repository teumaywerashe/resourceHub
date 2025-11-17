import React, { useContext, useEffect } from "react";

import "./Navebar.css";
import { assets } from "../../../frontend/src/asset/assets";
import { LogOutIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../../frontend/src/context/store";

function Navebar({ setShowLogin }) {
  const navigate = useNavigate();
  const logoutProfile = () => {
    console.log(uniId);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("uniId");
    navigate("/");
  };
  const { getUniversity, currentUniversity,LogOut } = useContext(StoreContext);
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
           <NavLink to='/'> <h1 className="uni-name">{currentUniversity?.name}</h1></NavLink>
          ) : (
            <></>
          )}
        </div>
        <div>
          {adminToken ? (
            <div className="profile">
              <img className="pro-logo" src={assets.admin} />
              <button onClick={logoutProfile} className="logout">
                <LogOutIcon />
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
