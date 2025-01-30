import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/ResetPassword.css';


function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');
  const navigate = useNavigate();

  // Check if the token is present
  if (!token) {
    return <div className="message error">Invalid or missing token. Please try again.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/reset-password`, { token, newPassword });
      setMessage(res.data.message); // Success message
      setMessageType('success'); // Show success message
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (err) {
      // Show a user-friendly error message
      if (err.response && err.response.data) {
        setMessage(err.response.data.message); // Error message
      } else {
        setMessage('An unexpected error occurred. Please try again later.');
      }
      setMessageType('error'); // Show error message
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="password" 
          placeholder="New Password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} 
          required
        />
        <button type="submit" disabled={!newPassword}>Reset Password</button>
      </form>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
