import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/BikeFormData.css';


const BikeFormData = () => {
  const [formData, setFormData] = useState({
    bikeName: '',
    fuelType: '',
    mileage: '',
    rentPerDay: '',
    bikeModel: '',
    bikeColor: '',
    bikeLocation: '',
    bikeDescription: '',
    bikeNumber: '', 
    bikeImage: null,
  });
  const [bikeImage, setBikeImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setBikeImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const data = new FormData();
    data.append('bikeImage', bikeImage);
    data.append('bikeName', formData.bikeName);
    data.append('fuelType', formData.fuelType);
    data.append('mileage', formData.mileage);
    data.append('rentPerDay', formData.rentPerDay);
    data.append('bikeModel', formData.bikeModel);
    data.append('bikeColor', formData.bikeColor);
    data.append('bikeLocation', formData.bikeLocation);
    data.append('bikeDescription', formData.bikeDescription);
    data.append('bikeNumber', formData.bikeNumber);

    // Retrieve the token
    const token = localStorage.getItem('authToken');

    if (!token) {
      toast.error('No token found! Please log in again.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bike/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Bike registered successfully!');

      // Reset the form state
      setFormData({
        bikeName: '',
        fuelType: '',
        mileage: '',
        rentPerDay: '',
        bikeModel: '',
        bikeColor: '',
        bikeLocation: '',
        bikeDescription: '',
        bikeNumber: '', 
        bikeImage: null,
      });
      //& Reset the file input field using its ID
       const fileInput = document.getElementById('bikeImage');
       if (fileInput) {
       fileInput.value = ''; 
     }

      
      console.log(response.data);
    } catch (error) {
      toast.error('Error registering bike. Please try again.');
      console.error('Error registering bike:', error);
      console.error('Error response:', error.response.data);
    }
  };

  return (
    <div id="form-container">
      <h2 id="form-header">
        <span className="white-part">Add</span> <span className="red-part">Bike</span>
      </h2>
      <form id="bike-form" onSubmit={handleSubmit}>
        {/* Section 1 */}
        <div className="form-section section-1">
          <div className="form-group">
            <label htmlFor="bikeImage">
              <span className="white-part">Bike</span> <span className="red-part">Image</span>
            </label>
            <input type="file" id="bikeImage" name="bikeImage" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label htmlFor="bikeName">
              <span className="white-part">Bike</span> <span className="red-part">Name</span>
            </label>
            <input
              type="text"
              id="bikeName"
              name="bikeName"
              placeholder="Enter bike name"
              value={formData.bikeName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fuelType">
              <span className="white-part">Fuel</span> <span className="red-part">Type</span>
            </label>
            <select id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleChange}>
              <option value="">Select fuel type</option>
              <option value="petrol">Petrol</option>
              <option value="electric">Electric</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mileage">
              <span className="white-part">Mileage</span>
            </label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              placeholder="Enter mileage (in km)"
              value={formData.mileage}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="form-section section-2">
          <div className="form-group">
            <label htmlFor="rentPerDay">
              <span className="white-part">Rent</span> <span className="red-part">Per Day</span>
            </label>
            <input
              type="number"
              id="rentPerDay"
              name="rentPerDay"
              placeholder="Enter rent per day"
              value={formData.rentPerDay}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bikeModel">
              <span className="white-part">Bike</span> <span className="red-part">Model</span>
            </label>
            <input
              type="text"
              id="bikeModel"
              name="bikeModel"
              placeholder="Enter bike model"
              value={formData.bikeModel}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bikeColor">
              <span className="white-part">Bike</span> <span className="red-part">Color</span>
            </label>
            <input
              type="text"
              id="bikeColor"
              name="bikeColor"
              placeholder="Enter bike color"
              value={formData.bikeColor}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bikeLocation">
              <span className="white-part">Bike</span> <span className="red-part">Location</span>
            </label>
            <input
              type="text"
              id="bikeLocation"
              name="bikeLocation"
              placeholder="Enter bike location"
              value={formData.bikeLocation}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bikeNumber">
              <span className="white-part">Bike</span> <span className="red-part">Number</span>
            </label>
            <input
              type="text"
              id="bikeNumber"
              name="bikeNumber"
              placeholder="Enter bike number"
              value={formData.bikeNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bikeDescription">
              <span className="white-part">Bike</span> <span className="red-part">Description</span>
            </label>
            <textarea
              id="bikeDescription"
              name="bikeDescription"
              placeholder="Enter bike description"
              value={formData.bikeDescription}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button id="form-submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BikeFormData;
