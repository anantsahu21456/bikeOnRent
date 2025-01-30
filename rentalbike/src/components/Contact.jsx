import React, { useState } from 'react';
import '../css/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '',});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div id="contact-container">
      <h2 id="contact-header">
        <span>Contact</span> <span>Us</span>
      </h2>
      <form onSubmit={handleSubmit} id="contact-form">
      <div className="form-group">
          <label htmlFor="name">
            <span className="white-part">Ro</span>
            <span className="red-part">le</span>
          </label>
          <select id="contact-name" name="role" value={formData.role} onChange={handleChange} required>
            <option value="customer">As a bike admin</option>
            <option value="partner">As a user</option>
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">
            <span className="white-part">Na</span>
            <span className="red-part">me</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <span className="white-part">Em</span>
            <span className="red-part">ail</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">
            <span className="white-part">Mess</span>
            <span className="red-part">age</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" id="contact-submit-btn">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
