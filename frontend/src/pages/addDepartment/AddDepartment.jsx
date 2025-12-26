import React, { useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { StoreContext } from "../../context/store";
// import { StoreContext } from "../../../frontend/src/context/store";

function AddDep() {
  const { campus, setCampus, url } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const campusId = searchParams.get("id");
  const level = searchParams.get("level");

  const [newDept, setNewDept] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newDept.trim()) {
      toast.error("Please enter a department name.");
      return;
    }

    const campusToUpdate = campus.find((c) => c._id === campusId);
    if (!campusToUpdate) {
      toast.error("Campus not found.");
      return;
    }
    const updatedDepartments = {
      ...campusToUpdate.departments,
      [level]: [...(campusToUpdate.departments[level] || []), newDept],
    };

    setCampus((prev) =>
      prev.map((c) =>
        c._id === campusId ? { ...c, departments: updatedDepartments } : c
      )
    );

    
    try {
      const res = await axios.patch(`${url}/api/campus/update/${campusId}`, {
        departments: updatedDepartments,
      });

      if (res.data.success) {
        toast.success("Department added successfully!");
        navigate("/campus"); 
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding department");
    }
  };

  return (
    <div className="add-dep-page">
      <h2>Add Department ({level})</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter department name"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
        />
        <button type="submit" className="button">
          Add Department
        </button>
      </form>
      <button className="button" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </div>
  );
}

export default AddDep;
