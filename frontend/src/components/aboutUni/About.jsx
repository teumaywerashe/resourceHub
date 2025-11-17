import React from 'react'
import './About.css'
function About({currentUniversity}) {
  return (
   <section id="about" className="about-section">
          <h3>About Our University</h3>
          <p>
            Established in {currentUniversity.establishedYear},{" "}
            {currentUniversity.name} is Ethiopia’s oldest and largest higher
            education institution. We are committed to excellence in teaching,
            research, and community service that shapes the future of Africa.
          </p>
        </section>
  )
}

export default About
