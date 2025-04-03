import { useState, useEffect } from 'react';
import { fetchMovies } from '../Services/api.js';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar.jsx';

import '../App.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const categories = [
    { id: 'popular', name: 'Popular' },
    { id: 'top_rated', name: 'Top Rated' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'now_playing', name: 'Now Playing' }
  ];

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(category, page);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 20)); // Limit to 20 pages
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [category, page]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <>
    <Navbar />
    <div className="content-page">
      
      <div className="page-header">
        <h1 className="page-title">Movies</h1>
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-tab ${category === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="content-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} item={{ ...movie, media_type: 'movie' }} />
            ))}
          </div>

          <div className="pagination">
            <button
              className="page-button"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="page-button"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Movies;