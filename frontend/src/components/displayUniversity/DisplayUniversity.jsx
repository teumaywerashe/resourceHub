import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayEach from "../displayEach/DisplayEach";
import "./DisplayUniversity.css";

function DisplayUniversity({ generation }) {
  const [data, setData] = useState([]);
  const fetchUniversity = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/university/get"
      );
      setData(response.data.uni);
      console.log(response.data.uni);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUniversity();
  }, []);
  return (
    <div className="display-university" id="university-display">
      <div>
        <h3 className="display">Your Bestes</h3>
      </div>
      <div className="display-each">
        {data.map((item, index) => {
          if (generation === "All" || generation === item.generation) {
            return (
              <DisplayEach
                key={index}
                id={item._id}
                index={index}
                name={item.name}
                image={item.logo}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default DisplayUniversity;
