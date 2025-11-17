import React from "react";
// import { assets } from "../../asset/assets";
import "./displayEach.css";
import { useNavigate } from "react-router-dom";

// import { StoreContext } from "../../context/store";
function DisplayEach({ name, id, logo }) {
  const navigate = useNavigate();

  return (
    <div
     
      onClick={() => {
        navigate(`/university?id=${id}`);
      }}
      className="university-display"
    >
      <div className="university-image">
        <img src={logo} alt="" />
      </div>
      <div className="univeristy-name">
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default DisplayEach;
