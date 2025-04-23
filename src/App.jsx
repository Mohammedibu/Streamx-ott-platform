
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import MyList from './pages/MyList';
import Search from './pages/Search';
import VideoPage from './pages/VideoPage';
import Loading from './components/Loading';
import { GlobalProvider, useGlobalContext } from './Context/GlobalContext.jsx';
import './App.css';
import Login from './pages/Login/Login.jsx';
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import SplashScreen from "./components/SplashScreen";


import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js';
import { ToastContainer } from 'react-toastify';

const AppContent = () => {
  const { isLoading } = useGlobalContext();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    
    return () => unsubscribe();
  }, []);

  if (!authChecked) return <Loading />;

  return (
    <>
      {isLoading && <Loading />}
      <SplashScreen />
      
      <div className="app-container">
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/movies" element={user ? <Movies /> : <Navigate to="/login" />} />
          <Route path="/tvshows" element={user ? <TVShows /> : <Navigate to="/login" />} />
          <Route path="/mylist" element={user ? <MyList /> : <Navigate to="/login" />} />
          <Route path="/search" element={user ? <Search /> : <Navigate to="/login" />} />
          <Route path="/watch/:mediaType/:id" element={user ? <VideoPage /> : <Navigate to="/login" />} />
         
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <GlobalProvider>
        <div className="app">
          <AppContent />
        </div>
      </GlobalProvider>
    </Router>
  );
};

export default App;
