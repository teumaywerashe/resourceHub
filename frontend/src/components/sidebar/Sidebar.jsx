import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BookImage, Building2, University, NewspaperIcon, LogOut } from "lucide-react";
import { StoreContext } from "../../context/store";

function Sidebar() {

  const {setIsSidebarOpen}=useContext(StoreContext)

  useEffect(() => {
    // Close sidebar on route change (optional)
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };  
    window.addEventListener("popstate", closeSidebar);
    return () => {
      window.removeEventListener("popstate", closeSidebar);
    };  
  }, [setIsSidebarOpen]);

  // Styles for the navigation links
  const baseLinkStyle = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group mx-3";
  const activeLinkStyle = "bg-blue-600 text-white shadow-lg shadow-blue-100";
  const inactiveLinkStyle = "text-slate-500 hover:bg-slate-100 hover:text-slate-900";

  return (
    <div className={`w-64 h-screen bg-white border-r border-slate-200 flex flex-col py-6`}>
      
      {/* 1. Header/Logo Section */}
      <div className="px-7 mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">UniAdmin</h1>
        </div>
      </div>

      {/* 2. Navigation Section */}
      <nav className="flex flex-col gap-2 flex-grow">
        <NavLink onClick={()=>setIsSidebarOpen(false)}
          to="/adminHome/add"
          className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
        >
          <University size={20} />
          <span className="font-medium text-sm">Update University</span>
        </NavLink>

        <NavLink onClick={()=>setIsSidebarOpen(false)}
          to="/adminHome/campus"
          className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
        >
          <Building2 size={20} />
          <span className="font-medium text-sm">Update Campuses</span>
        </NavLink>

        <NavLink onClick={()=>setIsSidebarOpen(false)}
          to="/adminHome/resources"
          className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
        >
          <BookImage size={20} />
          <span className="font-medium text-sm">Resources</span>
        </NavLink>

        <NavLink onClick={()=>setIsSidebarOpen(false)}
          to="/adminHome/news"
          className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
        >
          <NewspaperIcon size={20} />
          <span className="font-medium text-sm capitalize">News</span>
        </NavLink>
      </nav>

      {/* 3. Bottom Image/Profile Section */}
      <div className="mt-auto px-4">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
          {/* THE IMAGE */}
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-slate-800 truncate">Alex Johnson</span>
            <span className="text-[11px] text-slate-500 font-medium">Super Admin</span>
          </div>
          <div className="items-end ml-auto">
            <LogOut size={16} className="text-red-500 hover:text-red-600 cursor-pointer" />

          </div>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;