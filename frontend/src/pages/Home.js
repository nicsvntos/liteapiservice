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

  const handleSignOut = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/signout?username=${username}`, {
        method: 'POST',
      });
      localStorage.removeItem('user');
      navigate('/signin');
    } catch (error) {
      setMessage('Sign out failed: ' + error.message);
    }
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="welcome-title">Welcome {username}</h1>
        <div className="welcome-message">
          <h2>{message}</h2>
        </div>
        <div className="user-actions">
          <button className="signout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
