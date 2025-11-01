import React from "react";

import { useContext, useEffect } from "react";
import { StoreContext } from "../../../frontend/src/context/store";
import "./Campus.css";
function Campus() {
  const { campus, adminToken, getUniversity } = useContext(StoreContext);

  const uniId = localStorage.getItem("uniId");
  useEffect(() => {
    getUniversity(uniId);
  }, []);
  return (
    <div className="campus-lists">
      <div className="campus-list">
        <h2>campus lists</h2>
        <button>+</button>
      </div>
      <hr />

      {campus.map((c, i) => (
        <div key={i}>
          <ul>
            <li>
              <h1>{c.name}</h1>
            </li>
            <div className="department">
              <p>departments</p>
              <button className="button">+</button>
            </div>
            {Object.entries(c.departments).map(([key, value]) => (
              <ul key={key} className="department-lists">
                <li>
                  <input type="text" value={value} />
                  <span>lavel</span>
                  <button>add</button>
                  <button>delete</button>
                </li>
                <hr />
              </ul>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Campus;
