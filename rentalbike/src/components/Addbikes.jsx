// AddBikes.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/addbikes.css'

function AddBikes() {
  return (
    <div id="addbikes">
      <h1>Add Bikes Section</h1>
      <p>Manage your bike listings here.</p>

      {/* Link to the BikeForm component */}
      <Link to="/addbikes/bikeformdata" className="add-bike-btn">
        Add a New Bike 
      </Link>
    </div>
  );
}

export default AddBikes;
