import React from "react";
import UniNav from "../../components/uniNav/UniNav";
import { useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/store";

import "./GetUniversity.css";
import axios from "axios";
function GetUni() {
  const {  url } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [currentUniversity, setCurrentUniveristy] = useState({});
  const [campus, setCampus] = useState([]);

  const getCampus = async () => {
    try {
      const response = await axios.get(`${url}/api/campus/find/${id}`);
      if (response.data.success) {
        setCampus(response.data.campus);
        console.log(response.data.campus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUniversity = async (id) => {
    try {
      const response = await axios.get(`${url}/api/university/find/${id}`);
      if (response.data.success) {
        // console.log(response.data.university);
        return setCurrentUniveristy(response.data.university);
      } else {
        console.log(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUniversity(id);
    console.log(currentUniversity)
    getCampus();
  }, []);
  return (
    <div className="each-uni">
      <UniNav />
      <div className="uni-info">
        <section id="home" className="hero-section">
          <div className="overlay"></div>
          <div className="hero-text">
            <h2>Welcome to {currentUniversity.name}</h2>
            <p>
              A leading center for research and innovation in Africa —
              empowering knowledge for a better future.
            </p>
            <a href="#about" className="learn-more-btn">
              Learn More
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <h3>About Our University</h3>
          <p>
            Established in {currentUniversity.establishedYear},{" "}
            {currentUniversity.name} is Ethiopia’s oldest and largest higher
            education institution. We are committed to excellence in teaching,
            research, and community service that shapes the future of Africa.
          </p>
        </section>

        <section id="faculties" className="faculties-section">
          <h3>Faculties</h3>

          <div className="faculty-grid">
            {campus.map((c,index) => (
              <div key={index} className="faculty-card">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-ec7d9c5b24b1?auto=format&fit=crop&w=600&q=60"
                  alt={`${c.name}`}
                />
                <h4>{c.name}</h4>
                <p>{c.description}</p>
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

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 {currentUniversity.name}. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default GetUni;
