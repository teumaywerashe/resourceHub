import React from 'react'
import {NavLink} from 'react-router-dom'
import './faculity.css'
function Faculity({campus,url}) {
  return (
     <section id="faculties" className="faculties-section">
          <h3>Faculties</h3>

          <div className="faculty-grid">
            {campus?.map((c, index) => (
              <NavLink to={`${c.name}/${c._id}`} key={index} className="faculty-card">
                <img src={`${url}/uploads/${c.logo}`} alt={`${c.name}`} />
                <h4>{c.name}</h4>
                <p>{c.description}</p>
              </NavLink>
            ))}
          </div>
        </section>
  )
}

export default Faculity
