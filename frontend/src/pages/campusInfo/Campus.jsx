import React, { useContext, useEffect } from "react";
// import { StoreContext } from "../../../frontend/src/context/store";
import { Plus, Trash2, PlusCircle } from "lucide-react"; // Icons for buttons
import "./Campus.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { StoreContext } from "../../context/store";

function Campus() {
  const { campus, setCampus, getUniversity, url } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const deleteDepartment = async ( ind, lev, campId) => {
    try {
      const response = await axios.get(`${url}/api/campus/find/${campId}`);

      if (response.data.success) {
        const currentCampus = response.data.campus;
        const departmentsCopy = { ...currentCampus.departments };

        const updatedLevel = departmentsCopy[lev].filter((_, i) => i !== ind);

        departmentsCopy[lev] = updatedLevel;

        setCampus((prev) =>
          prev.map((c) =>
            c._id === campId ? { ...c, departments: departmentsCopy } : c
          )
        );

        const res = await axios.patch(`${url}/api/campus/update/${campId}`, {
          departments: departmentsCopy,
        });

        if (res.data.success) toast.success("Department deleted successfully");
        else toast.error(res.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting department");
    }
  };

  const deleteCampus = async (id) => {
    try {
     
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
          onClick={() => navigate("/adminHome/campusAdd")}
          id="campus-button"
          className="button campus-button"
        >
          <Plus size={16} />
          Add Campus
        </button>
      </div>

      {campus?.map((c, i) => (
        <div key={i}>
          <ul key={c._id}>
            <li className="campus ">
              <h1 className="campus-name">{c.name}</h1>
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
              <h2>Programs</h2>
            </div>
            {Object.entries(c.departments)?.map(
              ([key, value]) =>
                value.length > 0 && (
                  <>
                    <h3 className="program">{key} Programs</h3>
                    <ul key={key} className="department-lists">
                      {value?.map((dept, i) => (
                        <li key={i}>
                          <input type="text" value={dept} readOnly />
                          <button
                            onClick={() =>
                              navigate(`/addResource?dept=${dept}&id=${c._id}`)
                            }
                            className="button"
                          >
                            <Plus size={14} /> cource
                          </button>
                          <button
                            onClick={() =>
                              navigate(
                                `/addDep?level=${key}&index=${i}&dept=${dept}&id=${c._id}`
                              )
                            }
                            className="button"
                          >
                            <Plus size={14} /> dep't
                          </button>{" "}
                          <button
                            onClick={() =>
                              deleteDepartment( i, key, c._id)
                            }
                            className="button delete-btn"
                          >
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
