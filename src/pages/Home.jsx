import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';
import Row from '../components/Row';
import { 
  fetchTrending, 
  fetchMovies, 
  fetchTVShows 
} from '../Services/api.js';
import { useGlobalContext } from '../Context/GlobalContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer';

import '../App.css';

const Home = () => {
  const { setIsLoading } = useGlobalContext();
  const { t } = useTranslation();

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
          title={t('categories.trending')} 
          fetchFunction={fetchTrending} 
          params={['all', 'day']} 
        />
        <Row 
          title={t('categories.popularMovies')} 
          fetchFunction={fetchMovies} 
          params={['popular']} 
        />
        <Row 
          title={t('categories.topRatedMovies')} 
          fetchFunction={fetchMovies} 
          params={['top_rated']} 
        />
        <Row 
          title={t('categories.popularTVShows')} 
          fetchFunction={fetchTVShows} 
          params={['popular']} 
        />
        <Row 
          title={t('categories.topRatedTVShows')} 
          fetchFunction={fetchTVShows} 
          params={['top_rated']} 
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;