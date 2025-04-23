import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import '../App.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get language display names
  const getLanguageDisplay = (code) => {
    switch(code) {
      case 'en': return 'English';
      case 'ta': return 'தமிழ்';
      case 'hi': return 'हिंदी';
      default: return code;
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Save the language preference to localStorage
    localStorage.setItem('userLanguage', lng);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button 
        className="language-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaGlobe className="globe-icon" />
        <span>{getLanguageDisplay(i18n.language)}</span>
        <FaChevronDown className={`chevron-icon ${isOpen ? 'open' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          <button 
            className={i18n.language === 'en' ? 'active' : ''} 
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button 
            className={i18n.language === 'ta' ? 'active' : ''} 
            onClick={() => changeLanguage('ta')}
          >
            தமிழ்
          </button>
          <button 
            className={i18n.language === 'hi' ? 'active' : ''} 
            onClick={() => changeLanguage('hi')}
          >
            हिंदी
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;