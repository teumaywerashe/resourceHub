import React from "react";
import { assets } from "../../asset/assets";
import { Calendar, ArrowRight, Megaphone, Bell } from "lucide-react";

function UniversityNews() {
  // 1. Realistic Dummy Data with Categories
  const news = [
    {
      id: 1,
      category: "Academic",
      title: "Final Exam Schedule Released",
      date: "Nov 25, 2024",
      desc: "The final exam timetable for the Fall semester has been published. Check your portal.",
      image: assets.resourceHub, // Using your asset
    },
    {
      id: 2,
      category: "Event",
      title: "Annual Science Fair 2024",
      date: "Dec 02, 2024",
      desc: "Join us at the main campus hall for an exhibition of groundbreaking student projects.",
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=300", 
    },
    {
      id: 3,
      category: "Sports",
      title: "Varsity Football Tryouts",
      date: "Dec 05, 2024",
      desc: "Registration is now open for the university football team. All departments welcome.",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bde9be51?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 4,
      category: "Alert",
      title: "Library Maintenance Notice",
      date: "Nov 30, 2024",
      desc: "The main library will be closed for server upgrades this weekend.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=300",
    },
    {
      id: 5,
      category: "Scholarship",
      title: "Global Excellence Grant",
      date: "Jan 10, 2025",
      desc: "Applications are now open for the 2025 international exchange program grant.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=300",
    },
  ];

  // Helper to get badge color
  const getBadgeColor = (type) => {
    switch (type) {
      case "Academic": return "bg-blue-100 text-blue-700";
      case "Alert": return "bg-red-100 text-red-700";
      case "Event": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section id="news" className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Bell size={16} className="animate-bounce" /> Latest Updates
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          Campus News & Announcements
        </h2>
      </div>

      {/* --- MARQUEE CONTAINER --- */}
      <div className="relative w-full">
        
        {/* Gradients to hide edges smoothly */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        {/* The Sliding Track */}
        <div className="flex w-max gap-8 animate-infinite-scroll hover:paused py-4">
          
          {/* We render the list TWICE to create the seamless loop effect */}
          {[...news, ...news].map((item, index) => (
            <div 
              key={index} 
              className="w-[320px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex-shrink-0"
            >
              {/* Image Area */}
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => e.target.src = "https://via.placeholder.com/300?text=News"} // Fallback
                />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(item.category)}`}>
                  {item.category}
                </span>
              </div>

              {/* Content Area */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {item.desc}
                </p>

                <button className="text-sm font-semibold text-indigo-600 flex items-center gap-1 group/btn">
                  Read More 
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Inline Styles for the Animation Keyframes */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: scroll 40s linear infinite;
        }
        .hover\\:paused:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default UniversityNews;