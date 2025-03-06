import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Park Finder</h1>
      <p>Discover the perfect parks for your outdoor adventures</p>
      <div className="hero-section">
        <h2>Find Your Next Outdoor Destination</h2>
        <p>
          Looking for a place to hike, picnic, or just enjoy nature? 
          Park Finder helps you discover parks near you with 
          recommendations based on your preferences.
        </p>
        <button className="cta-button">Explore Parks</button>
      </div>
      <div className="features-section">
        <div className="feature">
          <h3>Find Local Parks</h3>
          <p>Discover parks in your area with detailed information</p>
        </div>
        <div className="feature">
          <h3>Read Reviews</h3>
          <p>See what others think about parks before you visit</p>
        </div>
        <div className="feature">
          <h3>Get Recommendations</h3>
          <p>Receive personalized park suggestions based on your interests</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

