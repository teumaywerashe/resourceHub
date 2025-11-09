import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../../frontend/src/asset/assets";
import { Upload, BookOpen, Calendar, MapPin } from "lucide-react";
import "./AddInfo.css"; // Make sure this path is correct
import { StoreContext } from "../../../frontend/src/context/store";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddInfo = () => {
  const { currentUniversity, getUniversity, url } = useContext(StoreContext);
  const [image, setImage] = useState(null);
  const uniId = localStorage.getItem("uniId");

  const [data, setData] = useState({ });
  const navigate=useNavigate()

  useEffect(() => {
    if (currentUniversity) {
      setData({
        logo: currentUniversity.logo || "",
        name: currentUniversity.name || "",
        generation: currentUniversity.generation || "",
        foundCity: currentUniversity.foundCity || "",
        region: currentUniversity.region || "",
        description: currentUniversity.description || "",
        establishedYear: currentUniversity.establishedYear || "",
      });
    }
  }, [currentUniversity]);

  const updateData = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };
  useEffect(() => {
    getUniversity(uniId);
  }, []);

  const updateUniversity = async () => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (image) formData.append("logo", image);
    try {
      const response = await axios.patch(
        `${url}/api/university/update/${uniId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
      console.log(response.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    uniId && (
      <div className="add-info-container">
        <div className="uni-logo">
          <p className="section-title">Upload University Logo</p>
          <label htmlFor="image" className="upload-label">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
              className="upload-image"
            />
            <Upload className="upload-icon" />
            <span className="upload-text">Click to Upload</span>
          </label>
          <input
            type="file"
            id="image"
            hidden
            name="logo"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setImage(file);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            <BookOpen /> University Name:
          </label>
          <select
            name="name"
            value={data.name}
            id="name"
            onChange={(e) => updateData(e)}
            className="form-input"
          >
            <option value="">-- Select a University --</option>
            <option value="Addis Ababa University">
              Addis Ababa University
            </option>
            <option value="Jimma University">Jimma University</option>
            <option value="Mekelle University">Mekelle University</option>
            <option value="Haramaya University">Haramaya University</option>
            <option value="Bahir Dar University">Bahir Dar University</option>
            <option value="Hawassa University">Hawassa University</option>
            <option value="Arba Minch University">Arba Minch University</option>
            <option value="University of Gondar">University of Gondar</option>
            <option value="Adama Science and Technology University">
              Adama Science and Technology University
            </option>
            <option value="Wolkite University">Wolkite University</option>
            <option value="Wollo University">Wollo University</option>
            <option value="Debre Markos University">
              Debre Markos University
            </option>
            <option value="Assosa University">Assosa University</option>
            <option value="Jigjiga University">Jigjiga University</option>
            <option value="Wolaita Sodo University">
              Wolaita Sodo University
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="generation" className="form-label">
            <Calendar /> Generation:
          </label>
          <select
            value={data.generation}
            name="generation"
            id="generation"
            onChange={(e) => updateData(e)}
            className="form-input"
          >
            <option value="First Generation">First Generation</option>
            <option value="Second Generation">Second Generation</option>
            <option value="Third Generation">Third Generation</option>
            <option value="Fourth Generation">Fourth Generation</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div className="location-group">
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              <MapPin /> Found City:
            </label>
            <input
              onChange={(e) => updateData(e)}
              value={data.foundCity}
              name="foundCity"
              type="text"
              id="city"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="found-region" className="form-label">
              <MapPin /> Found Region:
            </label>
            <input
              onChange={(e) => updateData(e)}
              value={data.region}
              name="region"
              type="text"
              id="found-region"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            <BookOpen /> About the University:
          </label>
          <textarea
            onChange={(e) => updateData(e)}
            value={data.description}
            id="description"
            name="description"
            className="form-input textarea"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="year" className="form-label">
            <Calendar /> Year of Establishment:
          </label>
          <input
            onChange={(e) => updateData(e)}
            value={data.establishedYear}
            type="number"
            name="establishedYear"
            id="year"
            min="1950"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <button onClick={()=>{updateUniversity
            navigate('/')
          }} className="submit-btn">
            Submit
          </button>
        </div>
      </div>
    )
  );
};

export default AddInfo;
