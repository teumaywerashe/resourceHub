// import axios from "axios";
import axios from "axios";
import React, { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  // const [showLogin, setShowLogin] = useState(true);
  const [userToken, setUserToken] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [universities, setUniversities] = useState([]);
  const [university, setUniversity] = useState();
  const [url] = useState("http://localhost:3000");

  const [data, setData] = useState({});

  const logOut = (person) => {
    localStorage.removeItem("token");
    if (person === "user") {
      setUserToken("");
    } else {
      setAdminToken("");
    }
  };

  const [campus, setCampus] = useState([]);
  const [currentUniversity, setCurrentUniveristy] = useState({});
  const getUniversity = async (id) => {
    try {
      const response = await axios.get(`${url}/api/university/find/${id}`);
      if (response.data.success) {
        setCurrentUniveristy(response.data.university);

        getCampus(response.data.university._id.toString());
      } else {
        console.log(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCampus = async (campusId) => {
    try {
      console.log(campusId);
      const response = await axios.get(`${url}/api/campus/find/${campusId}`);
      if (response.data.success) {
        setCampus(response.data.campus);
        console.log(response.data.campus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        userToken,
        currentUniversity,
        setUserToken,
        adminToken,
        setAdminToken,
        universities,
        setUniversities,
        university,
        setUniversity,
        url,
        logOut,
        data,
        setData,
        campus,
        getUniversity,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
