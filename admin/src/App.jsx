import { Route, Routes } from "react-router-dom";
import Navebar from "../components/navbar/Navebar";
import UniversityInfo from "../pages/mainInfo/UniversityInfo";
import Sidebar from "../components/sidebar/Sidebar";
import "./App.css";
import Campus from "../pages/campusInfo/Campus";
import Login from "../components/login/Login";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { StoreContextProvider } from "../../frontend/src/context/store";
import AddInfo from "../pages/addInfo/AddInfo";
import { assets } from "../../frontend/src/asset/assets";
import AddCampus from "../pages/addCampus/addCampus";

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
                  <Route path="/add" element={<AddInfo />}></Route>
                  <Route
                    path="/university"
                    element={<UniversityInfo />}
                  ></Route>
                  <Route path="/campus" element={<Campus />}></Route>
                  <Route path="/campusAdd" element={<AddCampus/>}></Route>
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
