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
  const { setAdminToken, url } = useContext(StoreContext);
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
              <option value="Addis Ababa University">
                Addis Ababa University
              </option>
              <option value="Jimma University">Jimma University</option>
              <option value="Mekelle University">Mekelle University</option>
              <option value="Haramaya University">Haramaya University</option>
              <option value="Bahir Dar University">Bahir Dar University</option>
              <option value="Hawassa University">Hawassa University</option>
              <option value="Arba Minch University">
                Arba Minch University
              </option>
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
