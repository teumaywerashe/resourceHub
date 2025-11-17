import React from "react";

import { useState } from "react";
import "./Login.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from "../../../frontend/src/asset/assets";
import { StoreContext } from "../../../frontend/src/context/store";
function Login({ showLogin, setShowLogin }) {
  const navigate = useNavigate();
  const { setAdminToken, url, getUniversity } = useContext(StoreContext);
  // const adminToken = localStorage.getItem("adminToken");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    university: "",
  });

  const updateData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    const newUrl =
      currentState === "Login"
        ? `${url}/api/admin/login`
        : `${url}/api/admin/register`;
    const response = await axios.post(newUrl, data);
    try {
      if (response.data.success) {
        console.log(response.data);
        setAdminToken(response.data.token);
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("uniId", response.data.uniId);
        setShowLogin(false);
        getUniversity(response.data.uniId);
        navigate(`/university?id=${response.data.uniId}`);
      } else {
        console.log(response.data.msg);
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.msg);
    }
  };

  const [currentState, setcurrentState] = useState("Login");

  return (
    <div className="login-page">
      <div className="login-contents">
        <div className="login-content">
          <h3>{currentState}</h3>
          <img
            onClick={() => setShowLogin(!showLogin)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <form onSubmit={createAdmin} className="login-info">
          {currentState === "Sign Up" && (
            <input
              onChange={(e) => updateData(e)}
              required
              name="name"
              value={data.name}
              placeholder="name"
              type="text"
            />
          )}
          <input
            onChange={(e) => updateData(e)}
            required
            name="email"
            placeholder="email"
            type="text"
            value={data.email}
          />
          <input
            onChange={(e) => updateData(e)}
            required
            value={data.password}
            name="password"
            placeholder="password"
            type="text"
          />
          {currentState === "Sign Up" && (
            <select
              onChange={(e) => updateData(e)}
              name="university"
              id="university"
              value={data.university}
              required
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
              <option value="Ambo University (AU)">Ambo University (AU)</option>
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
              <option value="Raya University (RU)">Raya University (RU)</option>
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
          )}

          <button type="submit">{currentState}</button>

          {currentState === "Login" ? (
            <p>
              don't have acount?
              <span onClick={() => setcurrentState("Sign Up")}>
                create account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setcurrentState("Login")}>login</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
