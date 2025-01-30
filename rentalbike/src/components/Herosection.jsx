import React from 'react';
import '../css/Herosection.css';

function Herosection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Unlock Your Next Ride With Anantobike <span>Easily</span></h1>
          <p>Whether it's a car, bike, or any ride you seek, we've got you covered. Start your journey today.</p>
          <button className="rent-now-btn"  onClick={() => document.getElementById('popularBike').scrollIntoView({ behavior: 'smooth' })}>Rent Now</button>
        </div>
        <div className="hero-image">
          <img src="/images/bike-1290613_1280.jpg" alt="Bike"  />
        </div>
      </div>
    </section>
  );
}

export default Herosection;
