import React from "react";
import { generation_list } from "../../asset/assets";
// If you are using Lucide icons elsewhere, a filter icon looks nice here
import { Filter } from "lucide-react"; 

function Explor({ generation, setGeneration }) {
  return (
    <section id="explore-menu" className="py-12 px-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* --- Header --- */}
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            Browse by Generation
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Ethiopian universities are categorized by their establishment era. 
            Select a generation below to filter the institutions.
          </p>
        </div>

        {/* --- Scrollable List --- */}
        <div className="w-full relative group">
            {/* Scroll Container */}
            <div className="flex gap-8 overflow-x-auto pb-8 px-4 justify-start md:justify-center scrollbar-hide snap-x">
                
                {/* Optional 'All' Button usually helps UX, but keeping your logic below */}
                
                {generation_list?.map((item, index) => {
                    const isActive = generation === item.name;
                    return (
                        <div
                            key={index}
                            onClick={() =>
                                setGeneration((prev) =>
                                    item.name === prev ? "All" : item.name
                                )
                            }
                            className="flex flex-col items-center gap-3 cursor-pointer min-w-[100px] snap-center transition-all duration-300 group/item"
                        >
                            <div className={`relative p-1 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg scale-110' : 'bg-transparent hover:bg-gray-200'}`}>
                                <div className="bg-white p-1 rounded-full">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover/item:opacity-100 grayscale group-hover/item:grayscale-0'}`}
                                    />
                                </div>
                                
                                {/* Active Indicator Checkmark (Optional polish) */}
                                {isActive && (
                                    <div className="absolute bottom-0 right-0 bg-indigo-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                                        ✓
                                    </div>
                                )}
                            </div>

                            <p className={`text-sm md:text-base font-medium transition-colors ${isActive ? 'text-indigo-700 font-bold' : 'text-gray-500'}`}>
                                {item.name}
                            </p>
                        </div>
                    );
                })}
            </div>
            
            {/* Gradient Fade for scroll indication on mobile */}
            <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
            <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden"></div>
        </div>

        <div className="w-full h-px bg-gray-100 mt-4"></div>
      </div>
    </section>
  );
}

export default Explor;