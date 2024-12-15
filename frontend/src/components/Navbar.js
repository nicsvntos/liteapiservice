import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#333',
      color: 'white'
    }}>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '1rem',
        margin: 0,
        padding: 0
      }}>
        <li><Link to="/signin" style={{color: 'white'}}>Sign In</Link></li>
        <li><Link to="/register" style={{color: 'white'}}>Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
