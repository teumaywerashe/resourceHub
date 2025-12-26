import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, ArrowRight, GraduationCap } from "lucide-react";

function Faculty({ campus, url }) {
  // Handle empty state to prevent showing a blank section
  if (!campus || campus.length === 0) return null;

  return (
    <section id="faculties" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4 border border-blue-100 uppercase tracking-wide">
            <GraduationCap size={16} />
            Academics
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#002147] mb-6 tracking-tight">
            Our Distinguished <span className="text-blue-600">Faculties</span>
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Leading the way in research and education across multiple
            disciplines, preparing the next generation of global leaders.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campus.map((c, index) => (
            <NavLink
              to={`${c.name}/${c._id}`}
              key={c._id || index}
              className="group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-200/60"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <img
                  src={`${url}/uploads/${c.logo}`}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=800&auto=format&fit=crop";
                  }}
                />

                {/* Floating Icon Badge */}
                <div className="absolute top-5 right-5 z-20 bg-white shadow-lg p-3 rounded-2xl transform group-hover:rotate-12 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#002147] mb-3 group-hover:text-blue-600 transition-colors">
                  {c.name}
                </h3>

                <p className="text-slate-500 text-base leading-relaxed mb-8 flex-grow line-clamp-3">
                  {c.description ||
                    "Advancing knowledge and discovery through world-class faculty research and innovative academic programs."}
                </p>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                    Explore Departments
                  </span>
                  <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faculty;
