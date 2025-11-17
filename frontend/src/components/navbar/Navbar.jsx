import React, { useState, useContext } from "react";
import { assets } from "../../asset/assets";
import "./Navbar.css";
import { Home, UniversityIcon, BookOpen, Phone, NewspaperIcon } from "lucide-react";
import { StoreContext } from "../../context/store";

function Navbar({ setShowLogin }) {
  const { userTooken } = useContext(StoreContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="nav">
      <div className="nav-content">
        <div className="left-nav">
          <img src={assets.logo} alt="UniHub" />
        </div>

        <button
          className="toogle-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li>
              <a href="#home">
                <Home size={20} />
                <span>Home</span>
              </a>
            </li>
            
            <li>
              <a href="#universities">
                <UniversityIcon />
                <span>Universities</span>
              </a>
            </li>
            <li>
              <a href="#">
                <Phone />
                <span>Contact</span>
              </a>
            </li>
            <li>
              <a href="#news">
                <NewspaperIcon />
                <span>News</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="right-nav">
          {userTooken ? (
            <img src={assets.profile_icon} alt="Profile" />
          ) : (
            <button onClick={() => setShowLogin(true)}>Get Started</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
