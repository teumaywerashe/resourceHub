import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../../../frontend/src/asset/assets";
import { useContext } from "react";
import { StoreContext } from "../../../frontend/src/context/store";
import axios from "axios";
function PostNews() {
  const uniId = localStorage.getItem("uniId");
  
  const [image, setImage] = useState(null);
  const [data, setData] = useState({ uniId: uniId });
  const { url } = useContext(StoreContext);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const postNew = async () => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/news/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        console.log("⏳ Request took too long!");
      } else {
        console.log("❌ Request failed:", error.message);
      }
      toast.error("error");
    }
  };

  return (
    <form onSubmit={(e)=>{e.preventDefault()
    postNew()}} className="post">
      <input
        type="file"
        src={image ? URL.createObjectURL(image) : assets.upload_area}
        alt="Upload Preview"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) setImage(file);
        }}
      />
      <input
        onChange={(e) => handleChange(e)}
        name="title"
        type="text"
        placeholder="title"
      />
      <textarea
        onChange={(e) => handleChange(e)}
        name="content"
        type="text"
        placeholder="content"
      />
      <div>
        <button>post</button>
      </div>
    </form>
  );
}

export default PostNews;
