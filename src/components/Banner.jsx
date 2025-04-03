import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTrending, getImageUrl } from '../Services/api.js';
import '../App.css';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRandomBanner = async () => {
      try {
        const trending = await fetchTrending('all', 'day');
        if (trending.length > 0) {
          const randomIndex = Math.floor(Math.random() * trending.length);
          setMovie(trending[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching banner content:', error);
      }
    };

    getRandomBanner();
  }, []);

  if (!movie) return null;

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const handlePlay = () => {
    const mediaType = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
    navigate(`/watch/${mediaType}/${movie.id}`);
  };

  const bannerStyle = {
    backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})`,
  };

  return (
    <header className="banner" style={bannerStyle}>
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button" onClick={handlePlay}>
            Play
          </button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className="banner-description">
          {truncate(movie.overview, 150)}
        </h1>
      </div>
      <div className="banner-fade-bottom" />
    </header>
  );
};

export default Banner;