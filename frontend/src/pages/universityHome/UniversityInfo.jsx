import React, { useContext,  } from "react";
import { NavLink,  } from "react-router-dom";
// import { StoreContext } from "../../../frontend/src/context/store";
import "./universityInfo.css";
// import { assets } from "../../../frontend/src/asset/assets";
import { StoreContext } from "../../context/store";
import { assets } from "../../asset/assets";

function UniversityInfo({ setShowLogin }) {
  const adminToken = localStorage.getItem("adminToken");


  const { url, currentUniversity, campus } = useContext(StoreContext);


  return adminToken ? (
    <div id="home" className="uni-info">
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${url}/uploads/${currentUniversity.logo})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-text">
          <h2>Welcome to {currentUniversity.name}</h2>
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
          {campus?.map((c, index) => (
            <NavLink
              to={`/${c.name}/${c._id}`}
              key={index}
              className="faculty-card"
            >
              <img src={`${url}/uploads/${c.logo}`} alt={`${c.name}`} />
              <h4>{c.name}</h4>
              <p>
                Join our {c.name} Faculty and become an innovator of the future.
              </p>
           
            </NavLink>
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
      <section className="hero-section">
        <img src={assets.resourceHub} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h2>Welcome to resource hub web</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore,
            debitis!
          </p>
          <button className="learn-more-btn" onClick={() => setShowLogin(true)}>
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default UniversityInfo;
