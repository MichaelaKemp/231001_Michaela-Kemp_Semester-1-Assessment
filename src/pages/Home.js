import React from 'react';
import devLogo from '../assets/DevLogo.png';

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={devLogo} alt="Orbiting Eyes Logo" className="logo-img" />
      </div>
      <h1>Welcome to Orbiting Eyes</h1>
      <p className="home-description">Orbiting Eyes is your portal to explore the mysteries of celestial bodies. Powered by NASA's Horizon API, we bring you the latest information on planets, stars, and more. Dive into our comparison tool or journey through the cosmic timeline to uncover the wonders of the universe.</p>
    </div>
  );
}

export default Home;
