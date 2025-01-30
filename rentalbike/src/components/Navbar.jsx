import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Navbar.css';
import { toast } from 'react-toastify';


function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext); // AuthContext se data consume karte hain
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Logging out with token:', token);

      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      logout(); // AuthContext update karega
      setDropdownOpen(false); // Dropdown ko turant close karein
      toast.success('Logged out successfully!');
      navigate('/signin');
    } catch (error) {
      console.error(error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Dropdown visibility toggle karein
  };

  return (
    <nav>
      <div className="logo">
        <Link className="text" to="/home"> Anant/Sahu </Link>
      </div>
      <ul>
        <li> <Link to="/home">Home</Link></li>
        <li> <Link to="/addbikes">Add Bikes</Link></li>
        <li> <Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="auth-links">
        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="auth-btn"> Sign Up </Link>
            <Link to="/signin" className="auth-btn"> Sign In </Link>
          </>
        ) : (
          <div className="user-dropdown">
            {/* Profile Button */}
            <button className="dropdown-btn" onClick={toggleDropdown}> 👤user </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout} className="logout-btn"> Logout </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
