import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Verifycode.css';  // Import the CSS file

function Verifycode() {
  return (
    <>
    <div className='main'>
    <div className='div-container'>
        <div className="div-content">
            <Link to="/login" className="back-link">👈Back to login</Link>
            <h1 className="div-heading">Verify Code</h1>
            <p className="div-paragraph">An authentication code has been sent to your email.</p> 
        </div>
        <div className="input-fields">
            <input type="text" className="input-field"  placeholder='7789BM6X'/>
        </div>
        <div className="bottom-content">
            <p className='bottom-content-paragraph'>Didn't receive a code? <span className="resend-text"><button className="resend-button">Resend</button></span></p>
            <button className="submit-button">Submit</button>
        </div>
    </div>
    </div>
    </>
  );
}
export default Verifycode;
