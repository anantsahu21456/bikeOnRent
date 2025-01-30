import { useNavigate } from 'react-router-dom';
import '../css/Bikecard.css';

const BikeCard = ({ _id, bikeImage, bikeName, bikeModel, fuelType, mileage, rentPerDay }) => {
  console.log("Bike ID passed to navigate:", _id);
  const navigate = useNavigate(); // Initialize navigate function

  const handleRentNow = () => {
    if (_id) {
      navigate(`/bike/${_id}`);
      // Scroll to the 'bikeDetails' section after navigation
      setTimeout(() => {
        const bikeDetailsSection = document.getElementById('bikeDetails');
        if (bikeDetailsSection) {
          bikeDetailsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0); 
    } else {
      console.log("Bike ID is missing");
    }
  };

  return (
    <div className="bike-card">
      {/* Image Container */}
      <div className="bike-card-image-section">
        <img src={bikeImage} alt={bikeName} className="bike-image" />
        <div className="image-design">Only 1 Left</div>
      </div>

      {/* Content Section */}
      <div className="bike-card-content-section">
        <div className="bike-name">
          <h3>{bikeName} {bikeModel}</h3>
        </div>

        <div className="bike-details">
          <div className="fuel-type">Fuel Type: {fuelType}</div>
          <div className="mileage">Mileage: {mileage} km/lt</div>
        </div>

        <div className="rent-per-day">
          Rs {rentPerDay} /day
        </div>

        <button className="rent-btn" onClick={handleRentNow}>Rent Now</button>
      </div>
    </div>
  );
};

export default BikeCard;
