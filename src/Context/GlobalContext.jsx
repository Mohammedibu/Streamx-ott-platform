import { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem('myList');
    return savedList ? JSON.parse(savedList) : [];
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (item) => {
    const isAlreadyInList = myList.some(
      (listItem) => listItem.id === item.id && listItem.media_type === item.media_type
    );
    
    if (!isAlreadyInList) {
      setMyList([...myList, item]);
    }
  };

  const removeFromMyList = (id, media_type) => {
    setMyList(
      myList.filter(
        (item) => !(item.id === id && item.media_type === media_type)
      )
    );
  };

  const isInMyList = (id, media_type) => {
    return myList.some(
      (item) => item.id === id && item.media_type === media_type
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        myList,
        addToMyList,
        removeFromMyList,
        isInMyList,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};