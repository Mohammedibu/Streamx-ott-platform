import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';
import { useTranslation } from 'react-i18next';
import '../App.css';

const Row = ({ title, fetchFunction, params = [] }) => {
  const [items, setItems] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFunction(...params);
        setItems(data.results || data);
      } catch (error) {
        console.error(`Error fetching data for row ${title}:`, error);
      }
    };

    fetchData();
  }, [fetchFunction, params, title]);

  const scroll = (direction) => {
    const container = rowRef.current;
    if (!container) return;

    const scrollAmount = 240; // Assuming each card is around 240px wide with margin
    const maxScroll = container.scrollWidth - container.clientWidth;
    let newPosition;

    if (direction === 'left') {
      newPosition = Math.max(scrollPosition - scrollAmount, 0);
    } else {
      newPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
      
      }
  
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
  
      setScrollPosition(newPosition);
    };
  
    if (items.length === 0) return null;
  
    return (
      <div className="row">
        <h2 className="row-title">{title}</h2>
        <div className="row-container">
          {scrollPosition > 0 && (
            <button 
              className="row-scroll-button left"
              onClick={() => scroll('left')}
            >
              <FaChevronLeft />
            </button>
          )}
          
          <div className="row-items" ref={rowRef}>
            {items.map((item) => (
              item.poster_path && (
                <MovieCard key={item.id} item={item} />
              )
            ))}
          </div>
          
          {items.length > 5 && (
            <button 
              className="row-scroll-button right"
              onClick={() => scroll('right')}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default Row;