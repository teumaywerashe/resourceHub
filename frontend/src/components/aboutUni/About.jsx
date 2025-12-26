import React, { useContext } from "react";
import { GraduationCap, ArrowRight } from "lucide-react";
import { StoreContext } from "../../context/store";

function About({ currentUniversity }) {

  const {url}=useContext(StoreContext)
  // Fallback in case props aren't loaded yet
  if (!currentUniversity) return null;

  return (
    <section id="about" className="relative bg-slate-50 py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold tracking-wide uppercase">
              <GraduationCap className="w-4 h-4 mr-2" />
              Who We Are
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002147] leading-tight">
              About <span className="text-blue-600">{currentUniversity.name}</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Established in <span className="font-semibold text-gray-900">{currentUniversity.establishedYear}</span>, 
              we stand as Ethiopia’s oldest and largest higher education institution. 
              We are committed to excellence in teaching, research, and community service 
              that shapes the future of Africa.
            </p>

            <div className="pt-4">
              <button className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#002147] rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Read Our History
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Image/Logo Display */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            
            {/* Logo Container */}
            <div className="hidden relative bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-full sm:flex items-center justify-center transform hover:-translate-y-2 transition-transform duration-500">
              <img
                src={`${url}/uploads/${currentUniversity.logo}`}
                alt={`${currentUniversity.name} Logo`}
                className="w-full h-auto object-contain max-h-[300px]"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300?text=University+Logo"; // Fallback image
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;