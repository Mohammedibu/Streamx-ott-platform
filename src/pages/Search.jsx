import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchContent } from "../Services/api.js";
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import VoiceSearch from '../components/VoiceSearch';
import '../App.css';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const [isVoiceSearchResult, setIsVoiceSearchResult] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const data = await searchContent(query);
        
        // Filter out items without poster path
        const validResults = data.results.filter(
          item => item.poster_path || item.profile_path
        );
        
        setResults(validResults);
        
        // Check if this was likely from voice search (from URL state)
        const state = location.state;
        setIsVoiceSearchResult(state?.fromVoice || false);
        
      } catch (err) {
        console.error('Error searching:', err);
        setError('Failed to perform search. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, location]);

  return (
    <>
      <Navbar />
      <div className="content-page">
        <div className="search-header">
          <h1 className="page-title">
            {query ? `Search results for "${query}"` : 'Search for movies or TV shows'}
          </h1>
          
          <div className="voice-search-large">
            <p>Try voice search</p>
            <VoiceSearch />
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : results.length === 0 ? (
          <div className="no-results">
            {query ? (
              <>
                <h2>No results found for "{query}"</h2>
                <p>Try a different search term or use voice search.</p>
              </>
            ) : (
              <p>Enter a search term to find movies and TV shows.</p>
            )}
          </div>
        ) : (
          <>
            {isVoiceSearchResult && (
              <div className="voice-search-result-banner">
                <p>Showing voice search results for "{query}"</p>
              </div>
            )}
            <div className="content-grid">
              {results.map((item) => (
                <MovieCard 
                  key={`${item.id}-${item.media_type}`} 
                  item={item} 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Search;