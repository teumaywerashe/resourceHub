import React from "react";
import { ChevronRight } from "lucide-react"; // Optional: npm install lucide-react

function Hero({ url, currentUniversity }) {
  // Construct image URL safely
  const bgImage = currentUniversity?.logo 
    ? `${url}/uploads/${currentUniversity.logo}`
    : "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop"; // Fallback campus image

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-[85vh] overflow-hidden"
    >
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
          src={bgImage}
          alt={currentUniversity?.name || "University"}
        />
        
        {/* Modern Gradient Overlay: Improves text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/50 to-[#002147]/90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up">
          
          

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Welcome to <br />
            <span className="text-[#ffcc00]">{currentUniversity?.name}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
            A leading center for research and innovation in Africa — empowering
            knowledge for a better future.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#about"
              className="group inline-flex items-center justify-center bg-[#ffcc00] text-[#002147] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:bg-yellow-400 hover:-translate-y-1 shadow-lg hover:shadow-yellow-500/50"
            >
              Learn More
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
         
          </div>

        </div>
      </div>
      
    
    </section>
  );
}

export default Hero;