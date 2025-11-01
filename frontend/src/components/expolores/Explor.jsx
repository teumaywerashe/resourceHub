import React from "react";
import "./Explor.css";
import { generation_list } from "../../asset/assets";
function Explor({ generation, setGeneration }) {
  return (
    <div id="explore-menu" className="explor-menu">
      <h1>Explore Your Best University</h1>
      <p className="explor-menu-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque nesciunt quaerat quos maxime possimus qui laudantium, atque quis dicta vel dolorum obcaecati consequuntur, eaque corporis aliquam. Unde odit molestias molestiae?
      </p>
      <div className="explore-menu-list">
        {generation_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setGeneration((prev) =>
                  item.name === prev ? "All" : item.name
                )
              }
              className="explore-menu-list-item"
              key={index}
            >
              <img
                className={item.name === generation ? "active" : ""}
                src={item.image}
                alt="image"
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default Explor;
