import React  from "react";
import { assets } from "../../asset/assets";
import "./displayEach.css";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../context/store";
function DisplayEach({ name, id }) {
  const navigate = useNavigate();
 
  return (
    <div id="universities" onClick={() => {navigate(`/university?id=${id}`);  }} className="university-display"
    >
      <div className="university-image">
        <img src={assets.first_generation} alt="" />
      </div>
      <div className="univeristy-name">
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default DisplayEach;
