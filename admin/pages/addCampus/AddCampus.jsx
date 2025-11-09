import React, { useContext, useState } from "react";
import axios from "axios";
import "./AddCampus.css";
import toast from "react-hot-toast";
import { BookOpen, Trash2 } from "lucide-react";
import { StoreContext } from "../../../frontend/src/context/store";
import { useNavigate } from "react-router-dom";
function AddCampus() {
  const navigate=useNavigate()
  const { url } = useContext(StoreContext);
  const uniId = localStorage.getItem("uniId");
  const [campusName, setCampusName] = useState("");
  const [logo, setLogo] = useState(null);
  const [description,setDescription]=useState('')
  const [departments, setDepartments] = useState({
    degree: [""],
    diploma: [""],
    masters: [""],
  });

  const handleChange = (type, index, value) => {
    const updated = { ...departments };
    updated[type][index] = value;
    setDepartments(updated);
  };

  const deleteDepartment = (type, index) => {
    setDepartments((prev) => {
      const updated = { ...prev };
      updated[type] = updated[type].filter((_, i) => i !== index);
      return updated;
    });
  };
  const addField = (type) => {
    const updated = { ...departments };
    updated[type].push("");
    setDepartments(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", campusName);
    formData.append("logo", logo);
    formData.append("uniId", uniId);
    formData.append("description",description)
    formData.append("departments", JSON.stringify(departments));

    try {
      const response = await axios.post(`${url}/api/campus/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        navigate('/campus')
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.error(err);
      toast.error("error", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Campus</h2>

      <label>Campus Name</label>
      <input
        type="text"
        value={campusName}
        onChange={(e) => setCampusName(e.target.value)}
        placeholder="Enter campus name"
      />

      <label>Logo</label>
      <input type="file" onChange={(e) => setLogo(e.target.files[0])} />

      <h3>Departments</h3>

      <div>
        <h4>Degree</h4>
        {departments.degree.map((item, index) => (
          <div key={index} className="input-display">
            <input
              type="text"
              placeholder="Enter degree department"
              value={item}
              onChange={(e) => handleChange("degree", index, e.target.value)}
            />{" "}
            <button
              type="button"
              className="button delete-btn"
              onClick={() => deleteDepartment("degree", index)}
            >
              <Trash2 size={14} />
              delete
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addField("degree")}>
          + Add Degree
        </button>
      </div>
      <div>
        <h4>Diploma</h4>
        {departments.diploma.map((item, index) => (
          <div key={index} className="input-display">
            <input
              type="text"
              placeholder="Enter diploma department"
              value={item}
              onChange={(e) => handleChange("diploma", index, e.target.value)}
            />{" "}
            <button
              type="button"
              className="button delete-btn"
              onClick={() => deleteDepartment("diploma", index)}
            >
              <Trash2 size={14} /> delete
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addField("diploma")}>
          + Add Diploma
        </button>
      </div>

      <div>
        <h4>Masters</h4>
        {departments.masters.map((item, index) => (
          <div key={index} className="input-display">
            <input
              type="text"
              placeholder="Enter masters department"
              value={item}
              onChange={(e) => handleChange("masters", index, e.target.value)}
            />{" "}
            <button
              type="button"
              className="button delete-btn"
              onClick={() => deleteDepartment("masters", index)}
            >
              <Trash2 size={14} /> delete
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addField("masters")}>
          + Add Masters
        </button>
      </div>
 <div className="form-group">
          <label htmlFor="description" className="form-label">
            <BookOpen /> About the University:
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="description"
            name="description"
            className="form-input textarea"
          ></textarea>
        </div>
      <button type="submit">Save Campus</button>
    </form>
  );
}

export default AddCampus;
