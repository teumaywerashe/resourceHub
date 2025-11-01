import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import DisplayUniversity from "../../components/displayUniversity/DisplayUniversity";
import Explor from "../../components/expolores/Explor";
import './Home.css'
function Homes({setShowLogin}) {
  const [generation ,setGeneration]=useState('All')
  return (
    <div className="home-page">
      <Navbar setShowLogin={setShowLogin} />
      <Header />
      <Explor generation={generation} setGeneration={setGeneration}/>
      <DisplayUniversity generation={generation} />
    </div>
  );
}

export default Homes;
