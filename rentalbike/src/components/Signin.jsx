import React, { useState,useContext} from 'react';
// import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // To make API requests
import { AuthContext } from '../context/AuthContext';
import '../css/Signin.css';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';


function Signin() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navigation hook
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`, {
        email,
        password,
      });
       

      console.log('API Response:', response.data);

      const { accessToken } = response.data; 

      // Check if token exists in response
      if (accessToken) {
        // Save token to localStorage
        login(accessToken); // Call the context function
        toast.success('Login successful!');
        
        // Redirect to home or any other page after login
        navigate('/home');  // Change this to the page you want after login
      } else {
        toast.error('Login failed, no token received.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div id="signin" className="signin-container">
      <div className="signin-box">
        <h3 className="signin-title">Welcome Back to Rental Bike</h3>
        <div className="signin-toggle">
          <Link to="/Signin" className="signin-btn active">Login</Link>
          <Link to="/Signup" className="signup-btn">Register</Link>
        </div>
        <p className="signin-text">Login to access your Rental bike account</p>

        <form onSubmit={handleLogin}>
          <div className="signin-inputs">
            <input
              type="email"
              placeholder="Email"
              className="signin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-wrapper">
              <input
                type="password"
                placeholder="Password"
                className="signin-input password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="toggle-password"></span> {/* Eye Icon */}
            </div>
          </div>

          <div className="signin-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="remember-label">Remember me</label>
            </div>
            <Link to="/Signin/Forgetpassword" className="forgot-password-btn">Forgot Password</Link>
          </div>

          <button type="submit" className="submit-login-btn">Login</button>
        </form>

        <p className="signup-link-text">
          Don't have an account? <Link to="/Signup" className="signup-link-btn">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
