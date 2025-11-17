import React, { useEffect } from "react";
import { StoreContext } from "../../context/store";

function UniversityNews({ currentUniversity }) {
  const id = currentUniversity._id;

  return (
    <div id="news">
      <h1>news here</h1>
    </div>
  );
}

export default UniversityNews;
