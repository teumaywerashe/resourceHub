import React from "react";
import "./Footer.css";
import { assets } from "../../asset/assets";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            maiores dolore illum!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />

            <img src={assets.linkedin_icon} alt="linkedin" />
            <img src={assets.x_icon} alt="twitter" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li><a href="">home</a></li>
            <li><a href="">universities</a></li> 
            <li><a href="">resource</a></li>
            <li><a href="">community</a></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li><a href="">+25290009090</a></li>
            <li><a href="">contact@uni.com</a></li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copy-right">
        copyRight {new Date().getFullYear()} &copy; uni.com all right reserved
      </p>
    </div>
  );
}

export default Footer;
