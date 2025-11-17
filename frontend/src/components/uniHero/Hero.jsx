import React from 'react'
import './Hero.css'
function Hero({url,currentUniversity}) {
  return (
   <section id="home" className="hero-section">
          <div className="overlay">
            <img src={`${url}/uploads/${currentUniversity.logo}`} alt="logo" />
          </div>
          <div className="hero-text">
            <h2>Welcome to {currentUniversity?.name}</h2>
            <p>
              A leading center for research and innovation in Africa —
              empowering knowledge for a better future.
            </p>
            <a href="#about" className="learn-more-btn">
              Learn More
            </a>
          </div>
        </section>
  )
}

export default Hero
