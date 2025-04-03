import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import logo from '../../assets/logoX.png';


const LandingPage = () => {
   

  
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login', { state: { email } });
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-logo-container">
          <img src={logo} alt="StreamX Logo" className="landing-logo" />
        </div>
     
        <button onClick={handleSignIn} className="signin-btn">Sign In</button>
      </header>

      <div className="landing-hero">
        <h1> Stream what you love, movies and TV shows</h1>
        <h2><b>Your screen. Your time. Your choice</b></h2>
        <h3><b>Your next favorite show is waiting. Enter your email to join or return.</b></h3>
        
        <form onSubmit={handleSubmit} className="email-signup-form">
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="get-started-btn">
              Get Started <span>&gt;</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;