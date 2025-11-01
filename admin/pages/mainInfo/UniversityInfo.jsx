import React from "react";

import { useSearchParams } from "react-router-dom";
import "./UniversityInfo.css";
import { useContext } from "react";
import { StoreContext } from "../../../frontend/src/context/store";
import { useEffect } from "react";

function UniversityInfo({ setShowLogin }) {
  const adminToken = localStorage.getItem("adminToken");

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  localStorage.setItems('uniId',id)
  const { getUniversity, currentUniversity, campus } = useContext(StoreContext);

  useEffect(() => {
    getUniversity(id);
  }, []);

  return adminToken ? (
    <div id="#home" className="uni-info">
      <section id="home" className="hero-section">
        <div className="overlay"></div>
        <div className="hero-text">
          <h2>Welcome to {currentUniversity.name}</h2>
          <p>{currentUniversity.description}</p>
          <a href="#about" className="learn-more-btn">
            Learn More
          </a>
        </div>
      </section>

      <section id="about" className="about-section">
        <h3>About Our University</h3>
        <p>
          Established in 1950, {currentUniversity.name} is Ethiopia’s renewable
          higher education institution. We are committed to excellence
          {currentUniversity.description}
        </p>
      </section>

      <section id="faculties" className="faculties-section">
        <h3>Our Faculties</h3>

        <div className="faculty-grid">
          {campus.map((c, index) => (
            <div key={index} className="faculty-card">
              <img
                src="https://images.unsplash.com/photo-1581092334651-ddf26d9a0f3b?auto=format&fit=crop&w=600&q=60"
                alt={`${c.name}`}
              />
              <h4>{c.name}</h4>
              <p>
                Join our {c.name} Faculty and become an innovator of the future.
              </p>
              <div>
                {Object.entries(c.departments).map(([level, deptArray]) => (
                  <div key={level}>
                    <h3>{level} Programs</h3>
                    <ul>
                      {deptArray.map((dept, i) => (
                        <li key={i}>{dept}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h3>Contact Us</h3>
        <p>
          Have questions or want to visit our campus? We’d love to hear from
          you!
        </p>
        <a href="mailto:info@aau.edu.et" className="contact-btn">
          Email Us
        </a>
      </section>

      <footer className="footer">
        <p>© 2025 Addis Ababa University. All Rights Reserved.</p>
      </footer>
    </div>
  ) : (
    <div className="welcome-page">
      <section id="home" className="hero-section">
        <div className="overlay"></div>
        <div className="hero-text">
          <h2>Welcome to ....</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore,
            debitis!
          </p>
          <button className="learn-more-btn" onClick={() => setShowLogin(true)}>
            get started
          </button>
        </div>
      </section>
    </div>
  );
}

export default UniversityInfo;
