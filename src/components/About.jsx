import React from 'react';
import '../styles/main.css'; 
import gurdeep from '../assets/gurdeep.png';
import ryan from '../assets/ryan.png';
import sam from '../assets/sam.png';
import marc from '../assets/marc.png';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-header">
        <h1>Meet Our Team</h1>
      </section>
      <section className="team-section">
        <div className="team">
          <div className="team-member">
            <img src={gurdeep} alt="Gurdeep Kaur" />
            <h3>Gurdeep Kaur</h3>
            <p>Frontend Developer</p>
            <p><a href="mailto:gurdeep@home.com">gurdeep@home.com</a></p>
          </div>
          <div className="team-member">
            <img src={ryan} alt="Ryan Burns" />
            <h3>Ryan Burns</h3>
            <p>Frontend Developer</p>
            <p><a href="mailto:ryan@home.com">ryan@home.com</a></p>
          </div>
          <div className="team-member">
            <img src={sam} alt="Sam Maqsoudi" />
            <h3>Sam Maqsoudi</h3>
            <p>Backend Developer</p>
            <p><a href="mailto:sam@home.com">sam@home.com</a></p>
          </div>
          <div className="team-member">
            <img src={marc} alt="Marc-Andre Baron-Campeau" />
            <h3>Marc Baron</h3>
            <p>Backend Developer</p>
            <p><a href="mailto:marc@home.com">marcandre@home.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
