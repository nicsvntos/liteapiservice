import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('user');

  useEffect(() => {
    if (!username) {
      navigate('/signin');
      return;
    }

    const fetchHome = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/home?username=${username}`);
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage('Failed to get home content');
      }
    };
    fetchHome();
  }, [username, navigate]);

  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="welcome-title">Welcome {username}!</h1>
        <div className="welcome-image">
          <img 
            src="/powder.gif" 
            alt="powder from arcane" 
            className="main-image"
          />
        </div>
        <div className="welcome-message">
          <p className="welcome-text">
            This is a dedicated homepage for {username}!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
