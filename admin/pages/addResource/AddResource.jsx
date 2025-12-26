import React from "react";
import "./AddResource.css";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { StoreContext } from "../../../frontend/src/context/store";

function AddResource() {
  const { url } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const campusId = searchParams.get("id");
  const departName = searchParams.get("dept");
  const [file, setFile] = useState(null);

  // useEffect(() => {
  //   console.log(data, url);
  // });

  const [data, setData] = useState({
    campusId,
    departName,
    title: "",
    description: "",
    type: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };
  const uploadResource = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (file) {
      formData.append("file", file);
      // console.log("file uploaded");
    }
    try {
      const response = await axios.post(
        `${url}/api/resources/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        console.log(response.data.msg);
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };
  return (
    <form onSubmit={uploadResource} className="resource-container">
      <div className="input-container">
        <input
          onChange={(e) => handleChange(e)}
          name="title"
          type="text"
          value={data.title}
          placeholder="file title"
        />
        <input
          onChange={(e) => handleChange(e)}
          name="description"
          type="text"
          value={data.description}
          placeholder="file description"
        />
        <select
          onChange={(e) => handleChange(e)}
          name="type"
          value={data.type}
          id=""
        >
          <option value="type">----select type of resource---</option>
          <option value="reference">reference</option>
          <option value="exam">exam</option>
          <option value="module">module</option>
        </select>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      </div>
      <button>upload</button>
    </form>
  );
}

export default AddResource;
