import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Forgetpassword.css';



function Forgetpassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="forget-password-container">
        <div className="forget-password-content">
            <Link to="/Signin">👈back to login</Link>
            <h1 className="forget-password-heading">Forget your Password?</h1>
            <p className="forget-password-paragraph">Don't worry, happens to all of us. Enter your email below to recover your password</p>
        </div>
        <div className="forget-password-input-fields">
            <input 
              className="forget-password-input-field" 
              type="email" 
              placeholder="xyz@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
        </div>
        <div className="forget-password-bottom">
            <button className="forget-password-button" onClick={handleSubmit}>Submit</button>
        </div>
        {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Forgetpassword;
