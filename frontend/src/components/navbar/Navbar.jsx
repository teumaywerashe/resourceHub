import React from "react";
import { assets } from "../../asset/assets";
import "./Navbar.css";
import { Home, UniversityIcon, BookOpen, Phone } from "lucide-react";
import { useContext } from "react";
import { StoreContext } from "../../context/store";
function Navbar({ setShowLogin }) {
  const { userTooken } = useContext(StoreContext);
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="left-nav">
          <img src={assets.logo} alt="UniHub" />
        </div>
        <div className="navbar-menu">
          <ul>
            <li>
              <a href="#universities">
                <Home size={20} />
                <span>Home</span>
              </a>
            </li>

            <li>
              <a href="">
                <BookOpen />
                <span>Resources</span>
              </a>
            </li>
            <li>
              <a href="">
                <UniversityIcon /> <span>Universities</span>
              </a>
            </li>

            <li>
              <a href="">
                <Phone />
                <span>contact</span>
              </a>
            </li>
          </ul>
        </div>
        <button className="toogle-button">☰</button>

        <div className="right-nav">
          {userTooken ? (
            <img src={assets.profile_icon} />
          ) : (
            <button onClick={() => setShowLogin(true)}>Get Started</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
