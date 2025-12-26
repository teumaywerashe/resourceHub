import React from "react";
import { useContext } from "react";
// import { StoreContext } from "../../../frontend/src/context/store";
import { useEffect } from "react";
// import { assets } from "../../../frontend/src/asset/assets";
import { Plus, Trash2 } from "lucide-react";
import "./Resource.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/store";
import { assets } from "../../asset/assets";
function Resource() {
  const { getResources, resources, url } = useContext(StoreContext);
  const navigate=useNavigate()
  useEffect(() => {
    getResources();
  }, []);
  return (
    <div className="resource-container">
      <div className="resource-head">
        <h1>Resources</h1>
        <button onClick={()=>navigate('/adminHome/addResource')}>
          <Plus size={14} /> Add Resources
        </button>
      </div>
      <div className="resource-display">
        {resources?.map((res) => (
          <div className="resource-card">
            <a href={`${url}/uploads/resources/${res.file}`} target="_blank">
              <img src={`${assets.resources}`} alt={`${res.file}`} />
              <div className="resource-info">
                <h2>{res.title}</h2>
                <p>{res.description}</p>
              </div>
            </a>
            <button>
              <Trash2 />
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resource;
