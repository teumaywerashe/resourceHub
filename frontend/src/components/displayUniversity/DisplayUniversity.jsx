import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayEach from "../displayEach/DisplayEach";
import "./DisplayUniversity.css";
import { SearchCheckIcon, SearchIcon } from "lucide-react";

function DisplayUniversity({ generation }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchUniversity = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/university/get"
      );
      setData(response.data.uni);
      console.log(response.data.uni);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUniversity();
  }, []);
  const filteredData = data.filter((d) => {
    return d.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div
      className="w-[95%] relative p-4 sm:w-full my-8 mx-auto bg-[#f9fafb] rounded-2x1 shadow-[0_4px_10px_rgba(0,0,0_0.1)]"
      id="universities"
    >
      <div>
        <h3 className="text-[1.8rem] font-semibold text-center mb-6 text-[#1a202c]">
          Your Bestes
        </h3>
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Search Icon */}
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm"
            placeholder="Search your university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center items-center">
        {filteredData.length > 0 ? (
          <>
            {filteredData.map((item, index) => {
              if (generation === "All" || generation === item.generation) {
                return (
                  <DisplayEach
                    key={index}
                    id={item._id}
                    index={index}
                    logo={`http://localhost:3000/uploads/${item.logo}`}
                    name={item.name}
                    image={item.logo}
                  />
                );
              }
            })}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No items found</p>
            <p className="text-gray-400 text-sm">
              Try to adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayUniversity;
