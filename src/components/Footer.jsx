// components/Footer.jsx
import React from 'react';
import '../App.css'; // Ensure you have the correct path to your CSS file
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>StreamX</h3>
          <p>© {new Date().getFullYear()} StreamX Inc.</p>
        </div>
        <div className="footer-section">
          <h4>Browse</h4>
          <ul>
            <li>Home</li>
            <li>Movies</li>
            <li>TV Shows</li>
            <li>My List</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li>FAQ</li>
            <li>Account</li>
            <li>Privacy</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        Built with ❤️ by StreamX Team
      </div>
    </footer>
  );
};

export default Footer;
