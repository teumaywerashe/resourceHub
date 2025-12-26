import "./App.css";
import { StoreContext } from "./context/store";
import AdminHome from "./pages/adminHome/AdminHome";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import {Toaster} from "react-hot-toast";
import Homes from "./pages/home/Homes";
import UserLogin from "./pages/login/Login";
import GetUni from "./pages/getUniverisity/GetUni";

function App() {
  const { showLogin, setShowLogin } = useContext(StoreContext);
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="app">
        {showLogin && <UserLogin setShowLogin={setShowLogin} />}
        <Routes>
          <Route
            path="/"
            element={<Homes setShowLogin={setShowLogin} />}
          ></Route>
          <Route path="/university" element={<GetUni />}></Route>
          <Route path="/adminHome/*" element={<AdminHome />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
