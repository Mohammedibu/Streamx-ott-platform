import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import logo from '../../assets/logoX.png';
import { FaChevronRight } from 'react-icons/fa';
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignIn = () => {
    navigate('/login', { state: { mode: 'signin' } });
  };

  const handleGetStarted = async (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    setLoading(true);
    
    try {
      const auth = getAuth();
      // Check if email exists in Firebase
      const methods = await fetchSignInMethodsForEmail(auth, email);
      
      if (methods.length > 0) {
        // User exists, redirect to login with signin mode
        navigate('/login', { state: { email, mode: 'signin' } });
      } else {
        // New user, redirect to login with signup mode
        navigate('/login', { state: { email, mode: 'signup' } });
      }
    } catch (error) {
      console.error("Error checking email:", error);
      // If there's an error, default to signup
      navigate('/login', { state: { email, mode: 'signup' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <img src={logo} alt="StreamX" className="landing-logo" />
        <div className="landing-header-right">
          <LanguageSwitcher />
          <button className="signin-btn" onClick={handleSignIn}>
            {t('landing.buttons.signIn')}
          </button>
        </div>
      </header>
      
      <div className="landing-hero">
        <h1>{t('landing.hero.title')}</h1>
        <h2>{t('landing.hero.subtitle')}</h2>
        <h3>{t('landing.hero.callToAction')}</h3>
        
        <form className="email-signup-form" onSubmit={handleGetStarted}>
          <div className="form-group">
            <input 
              type="email" 
              placeholder={t('landing.form.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="get-started-btn"
              disabled={loading}
            >
              {loading ? t('landing.form.checking') : (
                <>
                  {t('landing.buttons.getStarted')} <FaChevronRight />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;