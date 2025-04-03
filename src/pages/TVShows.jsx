import { useState, useEffect } from 'react';
import { fetchTVShows } from '../Services/api.js';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar.jsx';
import '../App.css';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [category, setCategory] = useState('popular');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const categories = [
    { id: 'popular', name: 'Popular' },
    { id: 'top_rated', name: 'Top Rated' },
    { id: 'on_the_air', name: 'On The Air' },
    { id: 'airing_today', name: 'Airing Today' }
  ];

  useEffect(() => {
    const getShows = async () => {
      setLoading(true);
      try {
        const data = await fetchTVShows(category, page);
        setShows(data.results);
        setTotalPages(Math.min(data.total_pages, 20)); // Limit to 20 pages
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      } finally {
        setLoading(false);
      }
    };

    getShows();
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
        <h1 className="page-title">TV Shows</h1>
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
            {shows.map((show) => (
              <MovieCard key={show.id} item={{ ...show, media_type: 'tv' }} />
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

export default TVShows;