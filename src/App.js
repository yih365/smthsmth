import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function MainPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/hidden');
  };

  return (
    <div className="main-page">
      <button onClick={handleButtonClick}>secret, do not press</button>
    </div>
  );
}

function HiddenPage() {
  const [cocktails, setCocktails] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const handlePressMe = () => {
    if (cocktails.length < 6) {
      setCocktails([...cocktails, {
        id: cocktails.length,
        left: Math.random() * 80 + 10
      }]);
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleNoPressMe = () => {
    setShowBirthdayMessage(true);
  };

  const handleOverlayClick = () => {
    setShowBirthdayMessage(false);
  };

  const handleVideoButton = () => {
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <div className="hidden-page">
      <img src="/clubbg.jpeg" alt="club background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <button className="button" onClick={handlePressMe}>
        <span>Press me</span>
      </button>
      <button className="button second-button" onClick={handleNoPressMe}>
        <span>No, press me</span>
      </button>
      <button className="button third-button" onClick={handleVideoButton}>
        <span>MEEE</span>
      </button>
      {cocktails.map((cocktail) => (
        <img 
          key={cocktail.id}
          src="/cocktail.png" 
          alt="falling cocktail" 
          className="falling-cocktail"
          style={{ left: `${cocktail.left}%` }}
        />
      ))}
      {showToast && (
        <div className="toast">
          Ok, that's enough for you
        </div>
      )}
      {showBirthdayMessage && (
        <div className="birthday-overlay" onClick={handleOverlayClick}>
          HAPPY BIRTHDAY Great chopsticks master!
        </div>
      )}
      {showVideo && (
        <div className="video-overlay">
          <div className="volume-text">volume on</div>
          <video
            ref={videoRef}
            src="/catrockhb.mp4"
            autoPlay
            onEnded={handleVideoEnd}
            className="video-player"
          />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hidden" element={<HiddenPage />} />
      </Routes>
    </Router>
  );
}

export default App;
