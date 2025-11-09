import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../../frontend/src/context/store";
import { Plus, Trash2, PlusCircle } from "lucide-react"; // Icons for buttons
import "./Campus.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Campus() {
  const { campus, setCampus, getUniversity, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const deleteCampus = async (id) => {
    try {
      console.log("id", id);
      console.log("url", url);
      const response = await axios.delete(`${url}/api/campus/delete/${id}`);
      if (response.data.success) {
        setCampus((pre) => pre.filter((camp) => camp._id !== id));
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("error", error.message);
    }
  };

  const uniId = localStorage.getItem("uniId");
  useEffect(() => {
    getUniversity(uniId);
  }, []);

  return (
    <div className="campus-lists">
      <div className="campus-list">
        <h1>campus lists</h1>
        <button
          onClick={() => navigate("/campusAdd?")}
          id="campus-button"
          className="button campus-button"
        >
          <Plus size={16} />
          Add Campus
        </button>
      </div>

      {campus.map((c, i) => (
        <div key={i}>
          <ul key={c._id}>
            <li className="campus campus-name">
              <h1 className="">{c.name}</h1>
              <button
                onClick={() => {
                  deleteCampus(c._id);
                }}
                className="button delete-btn"
              >
                <Trash2 size={14} /> delete
              </button>
            </li>
            <div className="department">
              <h2>departments</h2>
            </div>
            {Object.entries(c.departments).map(
              ([key, value]) =>
                value.length > 0 && (
                  <>
                    <h3>{key} Programs</h3>
                    <ul className="department-lists">
                      {value.map((dept, i) => (
                        <li key={i}>
                          <input type="text" value={dept} readOnly />

                          <button className="button">
                            <Plus size={14} /> add
                          </button>
                          <button className="button delete-btn">
                            <Trash2 size={14} /> delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Campus;
