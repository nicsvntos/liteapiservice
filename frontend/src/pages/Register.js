import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.detail);
        return;
      }

      // Navigate to validate page with username and validation code
      navigate('/validate', { 
        state: { 
          username,
          validationCode: data.validation_code 
        }
      });
    } catch (error) {
      setError('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="page">
      <h1>Register</h1>
      <div className="form">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
