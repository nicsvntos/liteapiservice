import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signin?username=${username}&password=${password}`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('user', username);
        navigate('/home');
      } else {
        setMessage(data.detail || 'Sign in failed');
      }
    } catch (error) {
      setMessage('Sign in failed: ' + error.message);
    }
  };

  return (
    <div className="page">
      <h1>Sign In</h1>
      <div className="form">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignIn}>Sign In</button>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}

export default SignIn;
