import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('user');

  const handleSignOut = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username
        })
      });
      localStorage.removeItem('user');
      navigate('/signin');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <nav>
      <div className="nav-container">
        {username ? (
          <div className="nav-right">
            <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div className="nav-center">
            <Link to="/register">Register</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
