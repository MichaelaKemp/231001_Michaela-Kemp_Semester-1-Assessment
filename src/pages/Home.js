import React from 'react';
import devLogo from '../assets/DevLogo.png';
import landImage from '../assets/Landing_Page_Image.jpg';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <div className="logo-container">
        <img src={devLogo} alt="Orbiting Eyes Logo" className="logo-img" />
      </div>
      <div className="content-container">
        <div className="text-container">
          <h1>Welcome to Orbiting Eyes</h1>
          <p className="home-description">Orbiting Eyes is your portal to explore the mysteries of celestial bodies. Powered by NASA's Horizon API, we bring you the latest information on planets, stars, and more. Dive into our comparison tool or journey through the cosmic timeline to uncover the wonders of the universe.</p>
        </div>
      </div>
      <div className="image-container">
          <img src={landImage} alt="Celestial Image" className="celestial-image" />
        </div>
      <div className="fun-facts-container">
        <h2>Fun Facts about Celestial Bodies</h2>
        <ul>
          <li>The Sun contains 99.8% of the mass in the entire solar system.</li>
          <li>Neutron stars are so dense that a teaspoonful would weigh about a billion tons on Earth.</li>
          <li>The Great Red Spot on Jupiter is a storm that has been raging for at least 400 years.</li>
        </ul>
      </div>
      <div className="calendar-events-container">
        <h2>Calendar Events for 2024</h2>
        <ul>
          <li>April 8-16: Lyrid Meteor Shower</li>
          <li>May 15: Total Lunar Eclipse</li>
          <li>November 11: Transit of Mercury</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
