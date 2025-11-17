import React from "react";
import "./Header.css";
import { assets } from "../../asset/assets";
function Header() {
  return (
    <div id="home" className="header">
      <div className="header-overlay">
        <div className="header-image">
          <img src={assets.resourceHub} alt="" />
        </div>
        <div className="header-content">
          <p>
            Discover all Ethiopian universities, explore departments, and access
            essential resources shared by students across the country.
          </p>
          <a href="#university-display">
            <button>Explore Universities</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
