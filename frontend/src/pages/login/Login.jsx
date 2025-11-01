import React from "react";
import "./Login.css";
import { assets } from "../../asset/assets";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/store";

function Login({ setShowLogin }) {
  const [currentState, setcurrentState] = useState("Login");
  const { setUserToken, url } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const updateData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };
  const createUser = async (e) => {
    e.preventDefault();
    const newUrl =
      currentState === "Login"
        ? `${url}/api/user/login`
        : `${url}/api/user/register`;

    const response = await axios.post(newUrl, data);
    try {
      if (response.data.success) {
        setUserToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <div className="login-contents">
        <div className="login-content">
          <h3>{currentState}</h3>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <form onSubmit={createUser} className="login-info">
          {currentState === "Sign Up" && (
            <input
              required
              name="name"
              value={data.name}
              placeholder="name"
              onChange={(e) => updateData(e)}
              type="text"
            />
          )}
          <input
            required
            name="email"
            value={data.email}
            onChange={(e) => updateData(e)}
            placeholder="email"
            type="text"
          />
          <input
            required
            name="password"
            value={data.password}
            onChange={(e) => updateData(e)}
            placeholder="password"
            type="text"
          />
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
