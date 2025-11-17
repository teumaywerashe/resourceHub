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
        navigate('/')
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
           <option value="Addis Ababa University (AAU)">
    Addis Ababa University (AAU)
</option>
<option value="University of Gondar (UoG)">
    University of Gondar (UoG)
</option>
<option value="Haramaya University (HU)">
    Haramaya University (HU)
</option>
<option value="Arba Minch University (AMU)">
    Arba Minch University (AMU)
</option>
<option value="Mekelle University (MU)">
    Mekelle University (MU)
</option>
<option value="Adama Science and Technology University (ASTU)">
    Adama Science and Technology University (ASTU)
</option>
<option value="Jimma University (JU)">
    Jimma University (JU)
</option>
<option value="Hawassa University (HWU)">
    Hawassa University (HWU)
</option>
<option value="Bahir Dar University (BDU)">
    Bahir Dar University (BDU)
</option>
<option value="Adigrat University (AGU)">
    Adigrat University (AGU)
</option>
<option value="Bule Hora University (BHU)">
    Bule Hora University (BHU)
</option>
<option value="Dilla University (DU)">
    Dilla University (DU)
</option>
<option value="Debre Markos University (DMU)">
    Debre Markos University (DMU)
</option>
<option value="Wollo University (WoU)">
    Wollo University (WoU)
</option>
<option value="Mizan–Tepi University (MTU)">
    Mizan–Tepi University (MTU)
</option>
<option value="Madda Walabu University (MWU)">
    Madda Walabu University (MWU)
</option>
<option value="Dire Dawa University (DDU)">
    Dire Dawa University (DDU)
</option>
<option value="Debre Berhan University (DBU)">
    Debre Berhan University (DBU)
</option>
<option value="Axum University (AXU)">
    Axum University (AXU)
</option>
<option value="Wolaita Sodo University (WSU)">
    Wolaita Sodo University (WSU)
</option>
<option value="Jijiga University (JJU)">
    Jijiga University (JJU)
</option>
<option value="Debre Tabor University (DBTU)">
    Debre Tabor University (DBTU)
</option>
<option value="Samara University (SU)">
    Samara University (SU)
</option>
<option value="Wachemo University (WCU)">
    Wachemo University (WCU)
</option>
<option value="Ambo University (AU)">
    Ambo University (AU)
</option>
<option value="Wolkite University (WKU)">
    Wolkite University (WKU)
</option>
<option value="Assosa University (ASU)">
    Assosa University (ASU)
</option>
<option value="Mettu University (MEU)">
    Mettu University (MEU)
</option>
<option value="Woldia University (WDU)">
    Woldia University (WDU)
</option>
<option value="Addis Ababa Science & Technology University (AASTU)">
    Addis Ababa Science & Technology University (AASTU)
</option>
<option value="Arsi University (ARU)">
    Arsi University (ARU)
</option>
<option value="Oda Bultum University (OBU)">
    Oda Bultum University (OBU)
</option>
<option value="Selale University (SLU)">
    Selale University (SLU)
</option>
<option value="Kebri Dehar University (KDU)">
    Kebri Dehar University (KDU)
</option>
<option value="Jinka University (JNU)">
    Jinka University (JNU)
</option>
<option value="Raya University (RU)">
    Raya University (RU)
</option>
<option value="Dembi Dolo University (DeDU)">
    Dembi Dolo University (DeDU)
</option>
<option value="Injibara University (IU)">
    Injibara University (IU)
</option>
<option value="Gambella University (GMU)">
    Gambella University (GMU)
</option>
<option value="Debark University (DKU)">
    Debark University (DKU)
</option>
<option value="Mekidela Amba University (MAU)">
    Mekidela Amba University (MAU)
</option>
<option value="Bonga University (BoNU)">
    Bonga University (BoNU)
</option>
<option value="Werabe University (WRU)">
    Werabe University (WRU)
</option>
<option value="Borana University (BRU)">
    Borana University (BRU)
</option>
<option value="Gudela University (GUDU)">
    Gudela University (GUDU)
</option>
<option value="Gojjam University (GOI)">
    Gojjam University (GOI)
</option>
<option value="Ethiopian Civil Service University (ECSU)">
    Ethiopian Civil Service University (ECSU)
</option>
<option value="Kotebe Metropolitan University (KMU)">
    Kotebe Metropolitan University (KMU)
</option>
<option value="St. Paul's Hospital Millennium Medical College (SPHMMC)">
    St. Paul's Hospital Millennium Medical College (SPHMMC)
</option>
<option value="Adwa Pan-African University (APAU)">
    Adwa Pan-African University (APAU)
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
          <button onClick={()=>updateUniversity()
          } className="submit-btn">
            Submit
          </button>
        </div>
      </div>
    )
  );
};

export default AddInfo;
