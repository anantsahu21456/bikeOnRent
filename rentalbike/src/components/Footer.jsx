import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../css/Footer.css';
import FeedbackForm from './FeedbackForm';
import GoToTop from './GoToTop';


const Footer = () => {
  const handleScrollToSection = (id) => {
    setTimeout(() => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        
        <div className="footer-section">
          <h2 className="footer-title">Anant Sahu</h2>
          <p>
            "Welcome🤝 to this side We’re excited😁 to offer you a convenient,
            eco-friendly bike rental experience. Explore the city, enjoy the
            ride, and join us in promoting a greener future. Happy😅 biking!"
          </p>

         
          <ul className="footer-description">
            <li>Frontend: Built with HTML, CSS, JavaScript, and React.js</li>
            <li>Backend: Powered by Node.js, Express.js, and MongoDB</li>
            <li>Image Storage: Integrated with Cloudinary</li>
            <li>Containerization: Utilized Docker</li>
            <li>Deployment: Hosted on AWS for a secure and scalable experience</li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/about" onClick={() => handleScrollToSection('aboutMe')}>About Us</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => handleScrollToSection('contact-container')}>Contact</Link>
            </li>
            <li>
              <Link to="/privacy-policy" onClick={() => handleScrollToSection('PrivacyPolicy')}>Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms&condition" onClick={() => handleScrollToSection('terms&conditions')}>Terms & Conditions</Link>
            </li>
          </ul>
        </div>

       
        <div className="footer-section">
          <h3>Follow Me</h3>
          <div className="social-icons">
            <a href="https://github.com/anantsahu21456" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} />
            </a>
            <a href="https://x.com/ashwani44996084" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} />
            </a>
            <a href="https://www.instagram.com/the_anant06/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
            <a href="https://www.linkedin.com/in/anant-sahu06/" target="_blank"rel="noopener noreferrer">
              <FaLinkedin size={30} />
            </a>
          </div>
          <div className="feedback-form-section">
        <FeedbackForm/>
      </div>
        </div>
      </div>

      <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Anant Sahu. All rights reserved.</p>

      </div>
      <GoToTop />
    </footer>
  );
};

export default Footer;
