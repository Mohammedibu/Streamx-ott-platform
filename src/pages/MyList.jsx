import { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context/GlobalContext.jsx';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar.jsx';
import { useTranslation } from 'react-i18next';
import '../App.css';

const MyList = () => {
  const { myList } = useGlobalContext();
  const [filterType, setFilterType] = useState('all');
  const [filteredList, setFilteredList] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredList(myList);
    } else {
      setFilteredList(myList.filter(item => item.media_type === filterType));
    }
  }, [myList, filterType]);

  return (
    <>
    <Navbar />
    <div className="content-page">
      <div className="page-header">
        <h1 className="page-title">{t('navigation.myList')}</h1>
        <div className="category-tabs">
          <button
            className={`category-tab ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            {t('categories.all')}
          </button>
          <button
            className={`category-tab ${filterType === 'movie' ? 'active' : ''}`}
            onClick={() => setFilterType('movie')}
          >
            {t('navigation.movies')}
          </button>
          <button
            className={`category-tab ${filterType === 'tv' ? 'active' : ''}`}
            onClick={() => setFilterType('tv')}
          >
            {t('navigation.tvShows')}
          </button>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="empty-list">
          <h2>{t('myList.emptyTitle')}</h2>
          <p>{t('myList.emptyDescription')}</p>
        </div>
      ) : (
        <div className="content-grid">
          {filteredList.map((item) => (
            <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default MyList;