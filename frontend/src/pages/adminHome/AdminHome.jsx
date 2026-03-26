import React, { useContext } from "react";
import AddInfo from "../addInfo/AddInfo";
import Resource from "../resource/Resource";
import Campus from "../campusInfo/Campus";
import AddCampus from "../addCampus/AddCampus";
import AddDepartment from "../addDepartment/AddDepartment";
import AddResource from "../addResource/AddResource";
import PostNews from "../postNews/PostNews";
import AddContact from "../addContact/AddContact";
import Navebar from "../../components/adminNav/Navebar";
import Sidebar from "../../components/sidebar/Sidebar";

import UniversityInfo from "../universityHome/UniversityInfo";
import { Route, Routes } from "react-router-dom";
import { StoreContext } from "../../context/store";

function AdminHome() {
  const { showLogin, setShowLogin } = useContext(StoreContext);

  return (
    <div className="app">
      <div className="home-page">
        <Navebar setShowLogin={() => setShowLogin(!showLogin)} />

        <hr />
        <div className="app-content">
          <div className="side">
            <Sidebar />
          </div>
          <Routes>
            <Route path="/" element={<UniversityInfo />}></Route>
            <Route path="/add" element={<AddInfo />}></Route>
            <Route path="/resources" element={<Resource />}></Route>
            <Route path="/university" element={<UniversityInfo />}></Route>
            <Route path="/campus" element={<Campus />}></Route>
            <Route path="/campusAdd" element={<AddCampus />}></Route>
            <Route path="/addDep" element={<AddDepartment />}></Route>
            <Route path="/addResource" element={<AddResource />}></Route>
            <Route path="/news" element={<PostNews />}></Route>
            <Route path="/contact" element={<AddContact />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
