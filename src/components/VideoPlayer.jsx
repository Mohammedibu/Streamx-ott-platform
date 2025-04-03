import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { fetchVideos } from '../Services/api.js';
import Loading from './Loading';
import '../App.css';

const VideoPlayer = ({ mediaType, id }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const fetchedVideos = await fetchVideos(mediaType, id);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, [mediaType, id]);

  if (loading) return <Loading />;

  // Find trailer or teaser
  const trailer = videos.find(
    (video) => 
      video.type === 'Trailer' || 
      video.type === 'Teaser' ||
      video.name.toLowerCase().includes('trailer') ||
      video.name.toLowerCase().includes('teaser')
  );

  // If no trailer found, use the first video
  const videoToPlay = trailer || videos[0];

  if (!videoToPlay) {
    return (
      <div className="no-video">
        <h2>No video available</h2>
      </div>
    );
  }

  return (
    <div className="video-player-container">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoToPlay.key}`}
        width="100%"
        height="100%"
        controls
        playing
        config={{
          youtube: {
            playerVars: { showinfo: 1 }
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;