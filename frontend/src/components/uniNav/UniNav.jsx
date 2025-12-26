import React, { useContext } from "react";

import { StoreContext } from "../../context/store";
import { NavLink } from "react-router-dom";
function UniNav() {
  const { currentUniversity,url } = useContext(StoreContext);
  return (
    <div className="flex items-center justify-between bg-white text-black p-2 m-0">
      <NavLink
        to={`/university?id=${currentUniversity._id}`}
        className="flex items-center gap-5"
      >
        <img
          className="w-[50px] h-[50px] rounded-[50%] cursor-pointer"
          src={`${url}/uploads/${currentUniversity.logo}`}
          alt=""
        />
        {currentUniversity && (
          <h1 className="hidden md:flex font-bold text-[26px]">{currentUniversity.name?.split("(")[1]?.split(")")[0]}</h1>
        )}
      </NavLink>
      <div className=" flex justify-center w-full">
         {currentUniversity && (
          <h1 className="sm:hidden font-bold text-[16px]">{currentUniversity.name?.split("(")[0]}</h1>
        )}
        <ul className="hidden sm:flex items-center gap-2 rounded-full bg-white/70 p-2 py-2 shadow-lg backdrop-blur-md border border-white/20">
          {[
            { name: "Home", href: "#home" },
            { name: "About", href: "#about" },
            { name: "Collages", href: "#faculties" },
            { name: "Announcement", href: "#news" },
            { name: "Resource", href: "#resource" },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="block px-5 py-2.5 text-sm bg-gray-50 font-medium text-gray-600 transition-all duration-300 ease-in-out hover:text-black hover:bg-gray-200 hover:shadow-sm rounded-full"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="border-0 font-bold text-white rounded-[10px] bg-[red] corsor-pointer px-2 py-1 m-0 hover:bg-black">
          portal
        </button>
        {/* <button onClick={()=>{logOut("user") navigate('/login')}}>logout</button> */}
      </div>
    </div>
  );
}

export default UniNav;
