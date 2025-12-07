import React, { useState, useContext, useEffect, useRef } from "react";
import { assets } from "../../asset/assets"; // Ensure this path is correct
import { StoreContext } from "../../context/store";
import { 
  Home, 
  GraduationCap, // Better icon for Universities
  BookOpen, 
  Phone, 
  Newspaper, 
  Menu, 
  X,
  LogOut,
  User,
  Settings,
  ChevronDown
} from "lucide-react";

function Navbar({ setShowLogin }) {
  const { userTooken } = useContext(StoreContext); // Kept variable name as provided
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const profileRef = useRef(null);

  // 1. Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Close Profile Dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation Links Data
  const navLinks = [
    { name: "Home", href: "#home", icon: <Home size={18} /> },
    { name: "Universities", href: "#universities", icon: <GraduationCap size={18} /> },
    { name: "News", href: "#news", icon: <Newspaper size={18} /> },
    { name: "Contact", href: "#contact", icon: <Phone size={18} /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md py-3" 
          : "bg-white md:bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* --- LOGO SECTION --- */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={assets.logo} alt="UniHub" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <span className={`text-xl md:text-2xl font-bold tracking-tight ${scrolled ? 'text-indigo-900' : 'text-indigo-900'}`}>
            Uni<span className="text-indigo-600">Hub</span>
          </span>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <ul className="hidden md:flex items-center gap-8 bg-white/50 px-6 py-2 rounded-full backdrop-blur-sm border border-transparent hover:border-gray-100 transition-all">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="flex items-center  gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors group"
              >
                <span className="group-hover:-translate-y-0.5 transition-transform">{link.icon}</span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* --- RIGHT ACTION SECTION --- */}
        <div className="flex items-center gap-4">
          
          {userTooken ? (
            /* Logged In State */
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 p-1.5 pr-3 rounded-full transition-colors border border-gray-100"
              >
                <img 
                  src={assets.profile_icon} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                />
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in origin-top-right">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-sm font-bold text-gray-800">My Account</p>
                  </div>
                  <a href="#profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600">
                    <User size={16} /> Profile
                  </a>
                  <a href="#settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600">
                    <Settings size={16} /> Settings
                  </a>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out State */
            <div className="hidden md:flex justify-center items-center gap-3">
              <button 
                onClick={() => setShowLogin(true)}
                className="text-gray-600 mt-10 font-medium hover:text-indigo-600 text-sm transition-colors"
              >
                Sign in
              </button>
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-700 p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.icon}
                {link.name}
              </a>
            </li>
          ))}
          
          {!userTooken && (
            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
              <button onClick={() => {setShowLogin(true); setIsMobileMenuOpen(false)}} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold shadow-md">
                Get Started
              </button>
              <button onClick={() => {setShowLogin(true); setIsMobileMenuOpen(false)}} className="w-full py-3 text-gray-600 font-medium">
                Sign In
              </button>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;