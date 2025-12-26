// import axios from "axios";
import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [resource, setResource] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);  


  const updateTime = (time) => {
    const date = new Date(time);

    // Format date part
    const datePart = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Format time part (HH:MM)
    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });

    return `${datePart} at ${timePart}`;
  };
  const [uniId, setUniId] = useState(localStorage.getItem("uniId") || "");
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || ""
  );
  const [universities, setUniversities] = useState([]);
  const [university, setUniversity] = useState();
  const [url] = useState("http://localhost:3000");
  const [news, setNews] = useState([]);
  const [universityNews, setUniversityNews] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  const [data, setData] = useState({});

  const logOut = () => {
    setAdminToken("");
    localStorage.removeItem("AdminToken");
    setAdminToken("");
    localStorage.removeItem("uniId");
    setUniId("");
  };

  const [campus, setCampus] = useState([]);
  const [currentUniversity, setCurrentUniveristy] = useState({});
  const getUniversity = async (id) => {
    try {
      const response = await axios.get(`${url}/api/university/find/${id}`);
      if (response.data.success) {
        setCurrentUniveristy(response.data.university);
        getCampus(response.data.university?._id.toString());
      } else {
        console.log(response.data.msg);
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getCampus = async (campusId) => {
    try {
      const response = await axios.get(`${url}/api/campus/find/${campusId}`);
      if (response.data.success) {
        setCampus(response.data.campus);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const getResources = async () => {
    try {
      const response = await axios.get(`${url}/api/resources/get`);
      if (response.data.success) {
        setResources(response.data.resources);
      } else {
        console.log("error");
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const getResource = async (id) => {
    try {
      const response = await axios.get(`${url}/api/resource/get/${id}`);
      if (response.data.success) {
        setResource(response.data.resource);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getAllNews = async () => {
    try {
      const response = await axios.get(`${url}/api/news/get`);
      setNews(response.data.news);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
const getUniversityNews = async (universityId) => {
    try {
      const response = await axios.get(
        `${url}/api/news/get/${universityId}`
      );
      setUniversityNews(response.data.uniNews);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <StoreContext.Provider
      value={{
        uniId,getUniversityNews,
        setUniId,
        updateTime,
        currentUniversity,
        setCurrentUniveristy,
        adminToken,
        setAdminToken,
        universities,
        setUniversities,
        university,
        setUniversity,
        url,
        logOut,
        showLogin,
        setShowLogin,
        data,
        setData,
        setCampus,
        campus,
        getUniversity,
        getResources,
        resources,
        getResource,
        resource,isSideBarOpen,setIsSideBarOpen,
        getAllNews,
        news,
        setNews,
        universityNews,
        setUniversityNews,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
