import React from "react";
import "./Login.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/store";
import { useNavigate } from "react-router-dom";
import { ListX, X } from "lucide-react";

function UserLogin({ setShowLogin }) {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const currentState = "Login";
  const [error, setError] = useState("");
  const { setAdminToken, url, setUniId } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const updateData = (e) => {
    setError("");
    const name = e.target.name;
    const value = e.target.value;
    setData((pre) => ({ ...pre, [name]: value }));
  };
  const createUser = async (e) => {
    e.preventDefault();
    const newUrl =
      currentState === "Login"
        ? `${url}/api/admin/login`
        : `${url}/api/admin/register`;

    const response = await axios.post(newUrl, data);
    try {
      if (response.data.success) {
        setAdminToken(response.data.token);
        setUniId(response.data.uniId);
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("uniId", response.data.uniId);
        navigate("/adminHome");
        setShowLogin(false);
      } else {
        setError(response.data.msg);
  
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      toast.error(response.data.msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-contents">
        <div className="login-content">
          <h3>Log In</h3>
          <X  onClick={() => setShowLogin(false)} className="cursor-pointer " size={26}/>
        </div>
        <form onSubmit={createUser} className="login-info">
          <input required name="email" value={data.email} onChange={(e) => updateData(e)} placeholder="email" type="text"
          />
          <input required name="password" value={data.password} onChange={(e) => updateData(e)} placeholder="password" type="text"
          />
          <div className="flex items-start justify-between">
            <input className="mt-2 mr-1" type="checkbox" id="checkbox" />{" "}
            <label htmlFor="checkbox" className="cursor-pointer">
              remember me
            </label>
            <span onClick={() => toast.success("feature comming soon")} className="ml-4">forget password</span>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={() => setIsLoggingIn(true)} type="submit">
            {isLoggingIn ? "Logging In ..." : "Log in"}
          </button>

          <p>
            Don't have account?
            <span  className="ml-3">
              contact admin
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
