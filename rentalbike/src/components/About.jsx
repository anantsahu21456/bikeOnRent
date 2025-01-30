import React from 'react';
import { Link } from 'react-router-dom';
import '../css/About.css'; // Make sure this matches your CSS file name

function About() {
  return (
    <div id='aboutMe' className="about-container">
      <h2>
        <span className="white">About</span> <span className="red">Me</span>
      </h2>
      <div className="about-topcontent">
        <div className="about-myself">
          <p>Who I Am ? </p>
          <p>Hello👋 and welcome!</p>
          <p>
            I’m Anant Sahu, and I’m excited to have you here. I’m 23 years old, and I hold a degree in Civil Engineering from Jabalpur Engineering College, graduating in 2023.
          </p>
          <p>
            After completing my studies, I joined JSpider, where I underwent 11 months of intensive training in full stack development. This experience honed my skills and prepared me to take on real-world projects with confidence.
          </p>
          <p>
            I also had the opportunity to work at Eventdtl Pvt Ltd as a full stack developer. Over my 6-month tenure, I contributed to various exciting projects, gaining hands-on experience in web development and team collaboration.
          </p>
          <p>Thank you for taking the time to learn about me. I look forward to helping you with all your bike rental needs!</p>
          {/* Social Media Links */}
          <div className="social-links">
            <Link to="https://www.linkedin.com/in/anant-sahu06/" target="_blank" className="social-icon">
              <img src="https://img.icons8.com/?size=512&id=13930&format=png" alt="LinkedIn" />
            </Link>
            <Link to="https://github.com/anantsahu21456" target="_blank" className="social-icon">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" />
            </Link>
            <Link to="https://www.instagram.com/the_anant06/" target="_blank" className="social-icon">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
            </Link>
          </div>
        </div>

        <div className="about-myphoto">
          <img src="/images/my image.jpg" alt="Anant Sahu" />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="mission-container">
        <h2>
          <span className="white">Our</span> <span className="red">Mission</span>
        </h2>
        {/* Image inside Our Mission Section */}
        <div className="mission-image">
          <img src="/images/bike-5286670_1280.jpg" alt="Our Mission" />
        </div>
        <div className="mission-content">
          <p>
            Our mission is to provide a seamless and efficient bike rental experience for all our users. We aim to make commuting easier, greener, and more affordable by offering a wide range of bikes for different needs. Whether you're looking for a quick ride or planning a long trip, we strive to ensure you have access to well-maintained bikes at competitive prices.
          </p>
          <p>
            We believe in promoting sustainable travel and making bike rentals accessible to everyone, while maintaining the highest standards of service and customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
