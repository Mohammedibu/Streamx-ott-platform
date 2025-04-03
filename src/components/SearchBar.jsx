import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../App.css';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };



  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies, TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input-large"
        />
       
        <button type="submit" className="search-submit">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;