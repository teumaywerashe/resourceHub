import { useState } from "react";
import "./App.css";
import Homes from "./pages/homes/Homes";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import { StoreContextProvider } from "./context/store";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import GetUni from "./pages/getUniverisity/GetUni";
import UniversityInfo from "../../admin/pages/home/UniversityInfo";
import AddInfo from "../../admin/pages/addInfo/AddInfo";
import Resource from "../../admin/pages/resource/Resource";
import Campus from "../../admin/pages/campusInfo/Campus";
import AddCampus from "../../admin/pages/addCampus/addCampus";
import AddDepartment from "../../admin/pages/addDepartment/addDepartment";

import AddResource from "../../admin/pages/addResource/AddResource";
import PostNews from "../../admin/pages/postNews/PostNews";
import Navebar from "../../admin/components/navbar/Navebar";
import Sidebar from "../../admin/components/sidebar/Sidebar";

import { assets } from "./asset/assets";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const role = "user";
  const uniId = localStorage.getItem("uniId");
  
  return (
    <StoreContextProvider>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        {role === "user" ? (
          <div className="app">
            {showLogin && <Login setShowLogin={setShowLogin} />}
            <Routes>
              <Route
                path="/"
                element={<Homes setShowLogin={setShowLogin} />}
              ></Route>
              <Route path="/university" element={<GetUni />}></Route>
            </Routes>
            :
            <Footer />
          </div>
        ) : (
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
                <div className="side">
                  {" "}
                  <Sidebar />
                </div>
                {uniId ? (
                  <Routes>
                    <Route path="/" element={<UniversityInfo />}></Route>
                    <Route path="/add" element={<AddInfo />}></Route>.
                    <Route path="/resources" element={<Resource />}></Route>
                    <Route
                      path="/university"
                      element={<UniversityInfo />}
                    ></Route>
                    <Route path="/campus" element={<Campus />}></Route>
                    <Route path="/campusAdd" element={<AddCampus />}></Route>
                    <Route path="/addDep" element={<AddDepartment />}></Route>
                    <Route
                      path="/addResource"
                      element={<AddResource />}
                    ></Route>
                    <Route path="/news" element={<PostNews />}></Route>
                  </Routes>
                ) : (
                  <img src={assets.resourceHub} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </StoreContextProvider>
  );
}

export default App;
