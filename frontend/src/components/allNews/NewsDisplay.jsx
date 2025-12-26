import React, { useContext } from "react";
import {
  Calendar,
  ArrowRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  NewspaperIcon,
} from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StoreContext } from "../../context/store";

function NewsDisplay() {
  const scrollRef = useRef(null);
  const [isRightScrollable, setIsRightScrollable] = useState(true);
  const [isLeftScrollable, setIsLeftScrollable] = useState(false);
  const scrollHandler = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: amount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scroller = scrollRef.current;

    if (!scroller) return;
    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, offsetWidth } = scroller;

      setIsLeftScrollable(scrollLeft > 0);

      setIsRightScrollable(scrollLeft + offsetWidth < scrollWidth);
    };

    updateScrollState();

    scroller.addEventListener("scroll", updateScrollState);

    return () => scroller.removeEventListener("scroll", updateScrollState);
  }, []);

  const { getAllNews, news, url, updateTime } = useContext(StoreContext);

  useEffect(() => {
    getAllNews();
  }, []);

  // Helper to get badge color
  const getBadgeColor = (type) => {
    switch (type) {
      case "Academic":
        return "bg-blue-100 text-blue-700";
      case "Alert":
        return "bg-red-100 text-red-700";
      case "Event":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
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

      <div className="hidden sm:flex justify-end relative z-1 gap-10 w-full h-full">
        {/* Left Button */}

        <button
          onClick={() => scrollHandler(-300)}
          className={`sm:absolute mr-2 -top-8 -right-10 sm:right-25 rounded-4xl shadow-md  -translate-y-1/2 ${
            isLeftScrollable ? "bg-white" : "bg-gray-300 text-white"
          }`}
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => scrollHandler(300)}
          className={` -top-8 right-3 sm:right-10  sm:absolute  -2  rounded-4xl shadow-md -translate-y-1/2 ${
            isRightScrollable ? "bg-white" : "bg-gray-300 text-white"
          }`}
        >
          <ChevronRight />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="relative px-4 overflow-scroll scrollbar-hide w-full"
      >
        {news.length > 0 ? (
          <div className="flex-col sm:flex sm:flex-row w-max gap-8 hover:paused py-4">
            {/* animate-infinite-scroll */}
            {/* We render the list TWICE to create the seamless loop effect */}
            {[...news].map((item, index) => (
              <div
                key={index}
                className="w-[320px] bg-white rounded-2xl shadow-sm border mb-10 border-gray-300 overflow-hidden hover:shadow-xl transition-shadow duration-300 group shrink-0"
              >
                {/* Image Area */}
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={`${url}/uploads/news/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300?text=News")
                    } // Fallback
                  />
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Calendar size={12} />
                    <span>{updateTime(item.createdAt)}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {item.desc}
                  </p>

                  <button className="text-sm font-semibold text-indigo-600 flex items-center gap-1 group/btn">
                    Read More
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center my-1 mx-auto justify-center py-12 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <NewspaperIcon size={24} className="text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No News Available
            </h3>
            <p className="text-gray-500">
              Stay tuned for updates from this university.
            </p>
          </div>
        )}
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

export default NewsDisplay;
