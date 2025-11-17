import React from "react";
import './NewsDisplay.css'
import { assets } from "../../asset/assets";
function NewsDisplay() {
  const news = [{ title: "exam announcment" ,content:"  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nam asperiores repellat eveniet est perferendis error consequatur. Tenetur, quasi in."},{ title: "exam announcment" ,content:"  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nam asperiores repellat eveniet est perferendis error consequatur. Tenetur, quasi in."},{ title: "exam announcment" ,content:"  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nam asperiores repellat eveniet est perferendis error consequatur. Tenetur, quasi in."},{ title: "exam announcment" ,content:"  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nam asperiores repellat eveniet est perferendis error consequatur. Tenetur, quasi in."},{ title: "exam announcment" ,content:"  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nam asperiores repellat eveniet est perferendis error consequatur. Tenetur, quasi in."},{ title: "exam announcment" ,content:"  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nam asperiores repellat eveniet est perferendis error consequatur. Tenetur, quasi in."},{ title: "exam announcment" ,content:"  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nam asperiores repellat eveniet est perferendis error consequatur. Tenetur, quasi in."},{ title: "exam announcment" ,content:"  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nam asperiores repellat eveniet est perferendis error consequatur. Tenetur, quasi in."}];
  return (
    <div className="news" id="news">
      <h1>what is new?</h1>
      <div className="news-container">
        {
          news.map((n,i)=>(
            <div className="news-display" key={i}>
              <img src={assets.resourceHub} alt="announcment" />
              <h3>{n.title}</h3>
              {/* <p>{n.content}</p> */}
            <button> <a href="">explore more</a></button> 
            </div>
          ))
        }
      </div>
    
    </div>
  );
}

export default NewsDisplay;
