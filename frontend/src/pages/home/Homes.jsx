import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import DisplayUniversity from "../../components/displayUniversity/DisplayUniversity";
import Explore from "../../components/expolores/Explore";
import "./Home.css";
import NewsDisplay from "../../components/allNews/NewsDisplay";
import Footer from "../../components/footer/Footer";
function Homes({ setShowLogin }) {
  const [generation, setGeneration] = useState("All");
  return (
    <div className="home-page">
      <Navbar setShowLogin={setShowLogin} />
      <Header />
      <Explore generation={generation} setGeneration={setGeneration} />
      <DisplayUniversity generation={generation} />
      <NewsDisplay />
      <Footer />
    </div>
  );
}

export default Homes;
