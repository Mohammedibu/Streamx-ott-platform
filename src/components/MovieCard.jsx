import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPlus, FaCheck } from 'react-icons/fa';
import { getImageUrl } from '../Services/api.js';
import { useGlobalContext } from '../Context/GlobalContext.jsx';
import '../App.css';

const MovieCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToMyList, removeFromMyList, isInMyList } = useGlobalContext();
  
  const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  const inMyList = isInMyList(item.id, mediaType);

  const handlePlay = () => {
    navigate(`/watch/${mediaType}/${item.id}`);
  };

  const handleListToggle = () => {
    if (inMyList) {
      removeFromMyList(item.id, mediaType);
    } else {
      addToMyList({
        ...item,
        media_type: mediaType,
      });
    }
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={getImageUrl(item.poster_path || item.backdrop_path)}
        alt={item.title || item.name}
        className="movie-card-img"
      />
      
      {isHovered && (
        <div className="movie-card-hover">
          <h3 className="movie-card-title">
            {item.title || item.name || item.original_name}
          </h3>
          <div className="movie-card-buttons">
            <button className="card-button play" onClick={handlePlay}>
              <FaPlay />
            </button>
            <button className="card-button list" onClick={handleListToggle}>
              {inMyList ? <FaCheck /> : <FaPlus />}
            </button>
          </div>
          <div className="movie-card-info">
            <span className="vote">{item.vote_average?.toFixed(1)}</span>
            <span className="year">
              {(item.release_date || item.first_air_date || '').slice(0, 4)}
            </span>
            <span className="type">{mediaType === 'tv' ? 'TV' : 'Movie'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;