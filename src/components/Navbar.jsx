import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import '../App.css';
import { logout } from '../../firebase';
import logo from "../../src/assets/logoX.png";
import VoiceSearch from './VoiceSearch';



const Navbar = () => {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <nav className={`navbar ${show && 'navbar-black'}`}>
      <div className="navbar-container">
        <Link to="/Home" className="navbar-logo">
          <img src={logo} alt='StreamX Logo' className='logoset'/>
        </Link>
        
        <div className="navbar-links">
          <Link to="/Home" className={location.pathname === '/Home' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}>
            Movies
          </Link>
          <Link to="/tvshows" className={location.pathname === '/tvshows' ? 'active' : ''}>
            TV Shows
          </Link>
          <Link to="/mylist" className={location.pathname === '/mylist' ? 'active' : ''}>
            My List
          </Link>
          
        </div>
        
        <div className="search-and-profile">
          <form className="search-container" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
            
            <VoiceSearch />
          </form>
          
          <div className='sign'>
            <button onClick={()=>{logout()}} className='sign-out-button'>SignOut</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;