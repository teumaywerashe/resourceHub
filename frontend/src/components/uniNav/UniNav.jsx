import React, { useContext } from "react";
import { assets } from "../../asset/assets";
import "./uniNav.css";
import { StoreContext } from "../../context/store";
import { NavLink } from "react-router-dom";
function UniNav() {
// const navigate=useNavigate()
  const {currentUniversity}=useContext(StoreContext)
  return (
    <div className="navbar-container">
      <NavLink to={`/university?id=${currentUniversity._id}`} className="left-navbar">
        <img src={assets.logo} alt="" />
        {currentUniversity&&<h1>{currentUniversity.name?.split("(")[1]?.split(")")[0]}</h1>}
      </NavLink>
      <div className="center-navbar">
        
        <ul>
          <li><a href="#home">home</a></li>
          <li><a href="">about</a></li>
          <li><a href="#">collages</a></li>
          <li><a href="#news">announcment</a></li>
          <li>resource</li>
        </ul>
      </div>
      <div className="right-navbar">
        <button>portal</button>
        {/* <button onClick={()=>{logOut("user") navigate('/login')}}>logout</button> */}
      </div>
    </div>
  );
}

export default UniNav;
