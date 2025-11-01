import { useState } from "react";
import "./App.css";
import Homes from "./pages/homes/Homes";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import { StoreContextProvider } from "./context/store";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import GetUni from "./pages/getUniverisity/GetUni";
import UpdateInfo from "./pages/info/UpdateInfo";
import AddInfo from "./pages/info/AddInfo";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <StoreContextProvider>
      <div>
        <div className="app">
          <Toaster position="top-right" reverseOrder={false} />
          {showLogin && <Login setShowLogin={setShowLogin} />}
          <Routes>
            <Route
              path="/"
              element={<Homes setShowLogin={setShowLogin} />}
            ></Route>
            <Route path="/university" element={<GetUni />}></Route>
             <Route
              path="/update"
              element={<UpdateInfo/>}
            ></Route>
            <Route path="/add" element={<AddInfo />}></Route>
         
          </Routes>
        </div>
      </div>

      <Footer />
    </StoreContextProvider>
  );
}

export default App;
