import React from 'react';
import '../css/Setpassword.css'

function Setpassword() {
  return (
    <div className='main-container'>
        <div className="content-box">
      <div className="top-content">
        <h1>Set a password</h1>
        <p>Your previous password has been reset. Please set a new password for your account.</p>
      </div>
      <div className="input-fields">
        <div className="input-group">
          <label htmlFor="create-password">Create Password</label>
          <input type="password" id="create-password" className="input-field" />
        </div>
        <div className="input-group">
          <label htmlFor="reenter-password">Re-enter Password</label>
          <input type="password" id="reenter-password" className="input-field" />
        </div>
      </div>
      <button>Set Password</button>
      </div>
    </div>
  );
}

export default Setpassword;
