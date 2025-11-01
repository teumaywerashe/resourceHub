import React, { useState } from "react";
import { assets } from "../../../frontend/src/asset/assets";

const AddInfo = () => {
  const [image, setImage] = useState(false);
  return (
    <div>
      <div className="uni-logo">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
          />
        </label>
        <input type="file" id="image" hidden onChange={() => setImage(true)} />
      </div>
      <div className="uni-name">
        <label htmlFor="uni-name">University Name:</label>
        <select name="uni-name" id="">
          <option value="">-- Select a University --</option>
          <option value="Addis Ababa University">Addis Ababa University</option>
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
      <div className="uni-generation">
        <label htmlFor="generation">Generation:</label>
        <select name="generation" id="">
          <option value="">First Generation</option>
          <option value="">Second Generation</option>
          <option value="">Third Generation</option>
          <option value="">Fourth Generation</option>
        </select>
      </div>
      <div className="found-city">
        <label htmlFor="found-city">Found City:</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="found-city">Found Region:</label>
        <input type="text" />
      </div>
      <div className="uni-description">
        <label htmlFor="description">about the univeristy-—-⁅ </label>
        <textarea name="description" id=""></textarea>
      </div>
      <div className="established-year">
        <label htmlFor="year">Year of Establishmenet</label>
        <input type="number" min-value='1950' />
      </div>
    </div>
  );
};

export default AddInfo;
