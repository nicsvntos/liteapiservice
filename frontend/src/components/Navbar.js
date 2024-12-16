import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('user');

  const handleSignOut = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/signout?username=${username}`, {
        method: 'POST',
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
          // When logged in, only show sign out button on the right
          <div className="nav-right">
            <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          // When not logged in, show register and sign in centered
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
