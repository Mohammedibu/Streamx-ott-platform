import { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context/GlobalContext.jsx';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar.jsx';
import '../App.css';

const MyList = () => {
  const { myList } = useGlobalContext();
  const [filterType, setFilterType] = useState('all');
  const [filteredList, setFilteredList] = useState([]);

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
      
        <h1 className="page-title">My List</h1>
        <div className="category-tabs">
          <button
            className={`category-tab ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button
            className={`category-tab ${filterType === 'movie' ? 'active' : ''}`}
            onClick={() => setFilterType('movie')}
          >
            Movies
          </button>
          <button
            className={`category-tab ${filterType === 'tv' ? 'active' : ''}`}
            onClick={() => setFilterType('tv')}
          >
            TV Shows
          </button>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="empty-list">
          <h2>Your list is empty</h2>
          <p>Add movies and TV shows to your list to see them here.</p>
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