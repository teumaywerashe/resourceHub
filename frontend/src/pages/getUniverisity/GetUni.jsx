import React from "react";

import { useSearchParams, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/store";
import UniNav from "../../components/uniNav/UniNav";
import "./GetUniversity.css";
import Faculity from "../../components/faculities/Faculity";
import About from "../../components/aboutUni/About";
import Hero from "../../components/uniHero/Hero";
import Contact from "../../components/contact/Contact";
import UniversityNews from "../../components/uniNews/UniversityNews";

function GetUni() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { currentUniversity, url, getUniversity, campus } =
    useContext(StoreContext);

  useEffect(() => {
    getUniversity(id);
    console.log(currentUniversity);
  }, []);
  return (
    <div className="each-uni">
      <UniNav />
      <div className="uni-info">
        <Hero currentUniversity={currentUniversity} url={url} />
        <About currentUniversity={currentUniversity} />
        <Faculity campus={campus} url={url} />
        <UniversityNews currentUniversity={currentUniversity}/>
        <Contact />
      </div>
    </div>
  );
}

export default GetUni;
