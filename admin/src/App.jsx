import { Route, Routes } from "react-router-dom";
import Navebar from "../components/navbar/Navebar";
import UniversityInfo from "../pages/home/UniversityInfo";
import Sidebar from "../components/sidebar/Sidebar";
import "./App.css";
import Campus from "../pages/campusInfo/Campus";
import Login from "../pages/login/Login";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { StoreContextProvider } from "../../frontend/src/context/store";
import AddInfo from "../pages/addInfo/AddInfo";
import { assets } from "../../frontend/src/asset/assets";
import AddCampus from "../pages/addCampus/addCampus";
import AddDepartment from "../pages/addDepartment/AddDepartment";
import Resource from "../pages/resource/Resource";
import AddResource from "../pages/addResource/AddResource";
import PostNews from "../pages/postNews/PostNews";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const uniId = localStorage.getItem("uniId");
  return (
    <StoreContextProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="app">
        {showLogin && (
          <div className="login-page">
            <Login showLogin={showLogin} setShowLogin={setShowLogin} />
          </div>
        )}
        <div className="home-page">
          <Navebar setShowLogin={setShowLogin} />
          <hr />
         <div className="app-content">
            <div className="side"> <Sidebar  /></div>
              {uniId ? (
                <Routes>
                  <Route path="/" element={<UniversityInfo />}></Route>
                  <Route path="/add" element={<AddInfo />}></Route>.
                  <Route path="/resources" element={<Resource/>}></Route>
                  <Route path="/university" element={<UniversityInfo />}></Route>
                  <Route path="/campus" element={<Campus />}></Route>
                  <Route path="/campusAdd" element={<AddCampus/>}></Route>
                  <Route path="/addDep" element={<AddDepartment/>}></Route>
                  <Route path="/addResource" element={<AddResource/>}></Route>
                  <Route path="/news" element={<PostNews/>}></Route>
                </Routes>
              ) : (
                <img src={assets.resourceHub} />
              )}
          </div>
        </div>
      </div>
    </StoreContextProvider>
  );
}

export default App;
