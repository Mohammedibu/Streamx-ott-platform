
import { useEffect } from 'react';
import Banner from '../components/Banner';
import Row from '../components/Row';
import { 
  fetchTrending, 
  fetchMovies, 
  fetchTVShows 
} from '../Services/api.js';
import { useGlobalContext } from '../Context/GlobalContext.jsx';
import Navbar from '../components/Navbar.jsx';
import '../App.css';

const Home = () => {
  const { setIsLoading } = useGlobalContext();

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading for smoother initial experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div className="home">
      <Navbar />
      <Banner />
      <div className="home-rows">
        <Row 
          title="Trending Now" 
          fetchFunction={fetchTrending} 
          params={['all', 'day']} 
        />
        <Row 
          title="Popular Movies" 
          fetchFunction={fetchMovies} 
          params={['popular']} 
        />
        <Row 
          title="Top Rated Movies" 
          fetchFunction={fetchMovies} 
          params={['top_rated']} 
        />
        <Row 
          title="Popular TV Shows" 
          fetchFunction={fetchTVShows} 
          params={['popular']} 
        />
        <Row 
          title="Top Rated TV Shows" 
          fetchFunction={fetchTVShows} 
          params={['top_rated']} 
        />
      </div>
    </div>
  );
};

export default Home;