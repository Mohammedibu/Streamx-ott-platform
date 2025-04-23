import { useEffect, useState } from "react";
import "../App.css"; // Import your CSS file for styling

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 4000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1 className="logo-text">Stream<span className="highlight">X</span></h1>
        
      </div>
    </div>
  );
};

export default SplashScreen;
