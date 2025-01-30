import React, { useState } from 'react';
import '../css/FeedbackForm.css';  // Importing the CSS for styling

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //& Reset form and show submission message
    setIsSubmitted(true);
    setName('');
    setMessage('');
  };

  return (
    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      {isSubmitted ? (
        <div className="thank-you-message">
          <p>Thank you for your feedback!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" required/>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="message" required ></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
