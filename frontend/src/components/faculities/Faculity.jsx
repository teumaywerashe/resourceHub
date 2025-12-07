import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react'; // Optional: npm install lucide-react

function Faculity({ campus, url }) {
  return (
    <section id="faculties" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
         
          <h3 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4">
            Our Faculties
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our diverse academic divisions dedicated to fostering innovation and critical thinking.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campus?.map((c, index) => (
            <NavLink 
              to={`${c.name}/${c._id}`} 
              key={index} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={`${url}/uploads/${c.logo}`} 
                  alt={c.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Faculty"; }}
                />
                
                {/* Floating Icon Badge */}
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-[#002147] mb-3 group-hover:text-blue-600 transition-colors">
                  {c.name}
                </h4>
                
                {/* Description with Line Clamp (prevents cards from being different sizes) */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {c.description || "Discover the programs and opportunities available within this faculty."}
                </p>

                {/* 'Read More' Link visual */}
                <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-800 mt-auto">
                  View Departments
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        
      </div>
    </section>
  );
}

export default Faculity;