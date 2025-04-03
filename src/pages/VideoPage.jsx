import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaCheck } from 'react-icons/fa';
import { fetchDetails, getImageUrl } from '../Services/api.js';
import VideoPlayer from '../components/VideoPlayer';
import Loading from '../components/Loading';
import { useGlobalContext } from '../Context/GlobalContext.jsx';

import '../App.css';

const VideoPage = () => {
  const { mediaType, id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToMyList, removeFromMyList, isInMyList } = useGlobalContext();
  
  const inMyList = details ? isInMyList(parseInt(id), mediaType) : false;

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchDetails(mediaType, id);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [mediaType, id]);

  const handleListToggle = () => {
    if (!details) return;
    
    if (inMyList) {
      removeFromMyList(details.id, mediaType);
    } else {
      addToMyList({
        id: details.id,
        title: details.title || details.name,
        poster_path: details.poster_path,
        backdrop_path: details.backdrop_path,
        vote_average: details.vote_average,
        release_date: details.release_date || details.first_air_date,
        media_type: mediaType,
      });
    }
  };

  if (loading) return <Loading />;
  if (!details) {
    return (
      <div className="error-container">
        <h2>Content not found</h2>
        <Link to="/Home" className="back-button">
          <FaArrowLeft /> Go Back Home
        </Link>
      </div>
    );
  }

  const releaseYear = (details.release_date || details.first_air_date || '').slice(0, 4);
  const genres = details.genres?.map(g => g.name).join(', ');

  return (
<>

    <div className="video-page">
     

      <Link to="/Home" className="back-link">
        <FaArrowLeft /> Back to Home
      </Link>
      
      <div className="video-section">
        <VideoPlayer mediaType={mediaType} id={id} />
      </div>
      
      <div className="video-details">
        <div className="video-info">
          <div className="video-header">
            <h1 className="video-title">
              {details.title || details.name} {releaseYear && `(${releaseYear})`}
            </h1>
            <button
              className="list-button"
              onClick={handleListToggle}
            >
              {inMyList ? <FaCheck /> : <FaPlus />}
              {inMyList ? 'In My List' : 'Add to My List'}
            </button>
          </div>
          
          <div className="video-meta">
            {details.vote_average && (
              <span className="rating">
                ⭐ {details.vote_average.toFixed(1)}/10
              </span>
            )}
            <span className="runtime">
              {mediaType === 'movie'
                ? `${details.runtime} min`
                : `${details.number_of_seasons} Season${details.number_of_seasons !== 1 ? 's' : ''}`}
            </span>
            {genres && <span className="genres">{genres}</span>}
          </div>
          
          <div className="video-overview">
            <h3>Overview</h3>
            <p>{details.overview}</p>
          </div>
        </div>
        
        {details.backdrop_path && (
          <div className="video-backdrop" style={{
            backgroundImage: `url(${getImageUrl(details.backdrop_path, 'w780')})`
          }} />
        )}
      </div>
    </div>
    </>
  );
};

export default VideoPage;