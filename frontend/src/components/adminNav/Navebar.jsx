import React, { useContext, useEffect } from "react";
import { LogOutIcon, Menu, X, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../asset/assets";
import { StoreContext } from "../../context/store";
import Sidebar from "../sidebar/Sidebar";

function Navebar({ setShowLogin }) {
  const navigate = useNavigate();

  const logoutProfile = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("uniId");
    navigate("/");
    window.location.reload();
  };

  const {
    getUniversity,
    currentUniversity,
    isSideBarOpen,
    setIsSideBarOpen,
    adminToken,
    uniId,
  } = useContext(StoreContext);

  useEffect(() => {
    if (uniId) {
      getUniversity(uniId);
    }
  }, [uniId, getUniversity]);

  return (
    <>
      <header className="sticky top-0 z-[60] w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <nav className="max-w-[1600px] mx-auto px-1 md:px-8 h-16 flex items-center justify-between">
          {/* Left: Mobile Toggle & Logo */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}
              className="p-0 text-slate-600 rounded-lg transition-colors sm:hidden"
            >
              {isSideBarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <NavLink to="/" className="flex items-center gap-2 group">
              <img
                src={assets.logo}
                alt="Logo"
                className="h-10 w-10 group-hover:opacity-80 transition-opacity"
              />
              <span className="hidden lg:block font-bold text-slate-800 tracking-tight">
                UniPortal
              </span>
            </NavLink>
          </div>

          {/* Center: University Name */}
          <div className="flex-1 flex justify-center px-6">
            {uniId && currentUniversity && (
              <div className="bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full hidden md:block transition-all hover:bg-white hover:shadow-sm">
                <h1 className="text-sm font-semibold text-slate-700 flex items-center gap-2 italic">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {currentUniversity.name}
                </h1>
              </div>
            )}
          </div>

          {/* Right: Auth Section */}
          <div className="flex items-center gap-4">
            {adminToken ? (
              <div className="relative group">
                {/* Profile Trigger */}
                <button className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-100 rounded-full transition-all border border-transparent hover:border-slate-200">
                  <img
                    className="w-8 h-8 rounded-full border border-indigo-200 object-cover shadow-sm"
                    src={
                      assets.admin ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    }
                    alt="Admin"
                  />
                  <span className="text-sm font-medium text-slate-600 hidden sm:inline-block">
                    Admin
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                      <p className="text-xs text-slate-400 font-medium">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-slate-700 truncate">
                        Administrator
                      </p>
                    </div>

                    <button
                      onClick={logoutProfile}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOutIcon size={16} />
                      Logout Profile
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-md shadow-indigo-100 active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSideBarOpen && (
        <div
          // className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 sm:hidden transition-opacity"
          onClick={() => setIsSideBarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Content */}
      <aside
        className={`fixed top-16 left-0 z-50 h-screen w-72 bg-white transition-transform duration-300 ease-in-out transform sm:hidden
          ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </aside>
    </>
  );
}

export default Navebar;
