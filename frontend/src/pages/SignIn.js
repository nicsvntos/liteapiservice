import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/signin?username=${username}&password=${password}`, {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        // Store username in localStorage
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
      <form className="form" onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default SignIn;
