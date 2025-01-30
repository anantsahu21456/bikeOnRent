import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Searchbar.css";


const Searchbar = () => {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedLocation = sessionStorage.getItem("location");
    const storedPickupDate = sessionStorage.getItem("pickupDate");
    const storedReturnDate = sessionStorage.getItem("returnDate");

    if (storedLocation && storedPickupDate && storedReturnDate) {
      setLocation(storedLocation);
      setPickupDate(storedPickupDate);
      setReturnDate(storedReturnDate);
      fetchBikes(storedLocation, storedPickupDate, storedReturnDate);
    }
  }, []);

  const fetchBikes = async (location, pickupDate, returnDate) => {
    setError("");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/bike/searched?bikeLocation=${location}&startDate=${pickupDate}&endDate=${returnDate}`
      );
      console.log("API Response:", response.data);

      if (
        response.data.success &&
        Array.isArray(response.data.availableBikes) &&
        response.data.availableBikes.length > 0
      ) {
        setBikes(response.data.availableBikes);
      } else {
        setBikes([]);
        setError("No bikes found for the selected criteria.");
      }
    } catch (err) {
      console.error("Error fetching bikes:", err);
      setError("Failed to fetch bikes. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location && pickupDate && returnDate) {
      sessionStorage.setItem("location", location);
      sessionStorage.setItem("pickupDate", pickupDate);
      sessionStorage.setItem("returnDate", returnDate);

      setBikes([]);
      setError("");

      fetchBikes(location, pickupDate, returnDate);
    } else {
      setError("Please fill in all fields.");
    }
  };

  const handleRentNow = (bikeId) => {
    navigate(`/bike-details/${bikeId}`); // Navigate to the bike details page

    // Smoothly scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <div className="search-field">
            <label htmlFor="location" className="search-label">
              Location
            </label>
            <input
              className="search-here"
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>

          <div className="search-field">
            <label htmlFor="pickup-date" className="search-label">
              Pickup Date
            </label>
            <input
              className="search-here"
              id="pickup-date"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
          </div>

          <div className="search-field">
            <label htmlFor="return-date" className="search-label">
              Return Date
            </label>
            <input
              className="search-here"
              id="return-date"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
          <button className="search-btn" type="submit">
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message-container">
          <p className="error-message">{error}</p>
        </div>
      )}

      {bikes.length > 0 ? (
        <div>
          <h2 className="search-results-heading">
            Available bikes !! based on your location and time⌚
          </h2>
          <div className="bike-list">
            {bikes.map((bike) => (
              <div key={bike._id} className="bike-card">
                <div className="bike-card-image-section">
                  <img
                    src={bike.bikeImage}
                    alt={bike.bikeName}
                    className="bike-image"
                  />
                  <div className="image-design">Only 1 Left</div>
                </div>

                <div className="bike-card-content-section">
                  <div className="bike-name">
                    <h3>
                      {bike.bikeName} {bike.bikeModel}
                    </h3>
                  </div>

                  <div className="bike-details">
                    <div className="fuel-type">
                      Fuel Type: {bike.fuelType}
                    </div>
                    <div className="mileage">
                      Mileage: {bike.mileage} km/lt
                    </div>
                  </div>

                  <div className="rent-per-day">Rs {bike.rentPerDay} /day</div>

                  <button
                    className="rent-now-btn"
                    onClick={() => handleRentNow(bike._id)}
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Searchbar;
