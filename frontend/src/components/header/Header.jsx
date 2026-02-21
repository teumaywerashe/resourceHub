import React, { useEffect, useState } from "react";
import { assets } from "../../asset/assets";
import { ArrowRight, BookOpen, Users, Globe } from "lucide-react";

function Header() {
  const [numberUniversity, setNumberUniversity] = useState(0);
  const [numberOfUser, setNumberOfUser] = useState(0);

  const [resourceCount, setResourceCount] = useState(0);
  useEffect(() => {
    const resourceInterval = setInterval(() => {
      setResourceCount((prev) => {
        if (prev >= 10000) {
          clearInterval(resourceInterval);
          return 10000;
        }
        return prev + 1000;
      });
    }, 50);
    return () => clearInterval(resourceInterval);
  }, []);

  useEffect(() => {
    const universityInterval = setInterval(() => {
      // setNumberOfUser((prev)=>prev+100);
      setNumberUniversity((prev) => {
        if (prev >= 50) {
          clearInterval(universityInterval);
          return 50;
        }
        return prev + 5;
      });
    }, 50);
    return () => clearInterval(universityInterval);
  }, []);

  useEffect(() => {
    const userInterval = setInterval(() => {
      setNumberOfUser((prev) => {
        if (prev >= 50000) {
          clearInterval(userInterval);
          return 50000;
        }

        return prev + 1000;
      });
    }, 10);
    return () => clearInterval(userInterval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1);
    }
    return num;
  };

  return (
    <header
      id="home"
      className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center font-semibold overflow-hidden bg-[grey]"
    >
      <div className="absolute w-full h-full inset-0 bg-linear-to-b from-black/30 to-black/40 z-10"></div>
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* Main Image */}
        <img
          src={assets.resourceHub}
          alt="Ethiopian University Students"
          className="w-full h-full object-cover opacity-1000 scale-105 animate-slow-zoom"
        />
        {/* Gradient Overlay (Dark Blue to Transparent) for readability */}
        <div className="absolute inset-0 "></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 container -mb-20 mx-auto px-6 md:px-12 flex items-center flex-col justify-center h-full">
        <div className="max-w-3xl animate-fade-in-up">
          {/* Main Headline */}
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
            Connect, Share, & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Excel Together.
            </span>
          </h1>

          {/* Subtext */}
          <p className="hidden sm:flex text-lg md:text-xl text-white mb-8 leading-relaxed max-w-2xl">
            Discover all Ethiopian universities, explore departments, and access
            essential resources shared by students, lecturers, and researchers
            across the country.
          </p>

          {/* Buttons */}
          <div className="flex flex-col mt-20 sm:flex-row gap-4 mb-2">
            <a
              href="#universities"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-1"
            >
              Explore Universities
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/40 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full transition-all hover:-translate-y-1">
              Share a Resource
            </button>
          </div>
        </div>

        {/* --- STATS FOOTER --- */}
        <div className="border-t border-white/10 pt-8 flex  gap-8 md:gap-16 animate-fade-in-up delay-100">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg text-yellow-400">
              <Globe size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {formatNumber(numberUniversity)}+
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Universities
              </p>
            </div>
          </div>

          <div className="flex items-center flex-col sm:flex-row gap-3">
            <div className="p-2 bg-white/10 rounded-lg text-green-400">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {formatNumber(resourceCount)}k+
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Resources
              </p>
            </div>
          </div>

          <div className="flex items-center flex-col sm:flex-row gap-3">
            <div className="p-2 bg-white/10 rounded-lg text-blue-400">
              <Users size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {formatNumber(numberOfUser)}k+
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
