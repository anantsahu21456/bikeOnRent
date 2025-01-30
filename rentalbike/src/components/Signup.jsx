import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css';
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    userName: '',
    avatar: null, // For file upload
  });

  // State to manage success or error messages
  // const [message, setMessage] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to handle file uploads
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', formData.email);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('password', formData.password);
      data.append('userName', formData.userName);
      data.append('avatar', formData.avatar);

      // Send POST request to the API
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success response
      if (response.data.success) {
        toast.success('Registration successful!');
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      // Handle error response
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div id="signup" className="signup-container">
      <div className="signup-box">
        <h3 className="signup-title">Welcome to Rental Bike</h3>
        <div className="signup-toggle">
          <Link to="/Signin" className="signin-btn">Login</Link>
          <Link to="/Signup" className="signup-btn active">Register</Link>
        </div>
        <p className="signup-text">Please enter your details carefully</p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <div className="signup-inputs">
            <div className="input-group">
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder=" "
                className="signin-input"
                onChange={handleInputChange}
                required
              />
              <label htmlFor="firstName" className="input-label">First Name</label>
            </div>

            <div className="input-group">
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder=" "
                className="signin-input"
                onChange={handleInputChange}
                required
              />
              <label htmlFor="lastName" className="input-label">Last Name</label>
            </div>

            <div className="input-group">
              <input
                id="email"
                type="email"
                name="email"
                placeholder=" "
                className="signin-input"
                onChange={handleInputChange}
                required
              />
              <label htmlFor="email" className="input-label">Email</label>
            </div>

            <div className="input-group">
              <input
                id="phoneNumber"
                type="number"
                name="phoneNumber"
                placeholder=" "
                className="signin-input"
                onChange={handleInputChange}
                required
              />
              <label htmlFor="phoneNumber" className="input-label">Phone Number</label>
            </div>

            <div className="input-group">
              <input
                id="password"
                type="password"
                name="password"
                placeholder=" "
                className="signin-input"
                onChange={handleInputChange}
                required
              />
              <label htmlFor="password" className="input-label">Password</label>
            </div>

            <div className="input-group">
              <input
                id="userName"
                type="text"
                name="userName"
                placeholder=" "
                className="signin-input"
                onChange={handleInputChange}
                required
              />
              <label htmlFor="userName" className="input-label">User Name</label>
            </div>

            <div className="input-group">
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="signin-input"
                onChange={handleFileChange}
                required
              />
              <label htmlFor="avatar" className="input-label">Avatar</label>
            </div>
          </div>

          <div className="signin-options">
            <div className="remember-me">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms" className="remember-label">I agree to the terms & conditions</label>
            </div>
          </div>

          <button type="submit" className="submit-login-btn">Register</button>
        </form>

        {/* Display success or error message */}
        {/* {message && <p className="message">{message}</p>} */}

        <p className="signup-link-text">
          Already have an account? <Link to='/Signin' className="signup-link-btn">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
