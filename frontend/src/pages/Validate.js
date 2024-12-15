import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Validate() {
  const [username, setUsername] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get stored validation data
    const storedData = localStorage.getItem('pendingValidation');
    if (storedData) {
      const { username: storedUsername, validationCode: storedCode } = JSON.parse(storedData);
      setUsername(storedUsername);
      setValidationCode(storedCode);
    }
  }, []);

  const handleValidate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/validate?username=${username}&code=${validationCode}`, {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // Clear stored validation data
        localStorage.removeItem('pendingValidation');
        // Navigate to signin page after successful validation
        setTimeout(() => navigate('/signin'), 1500);
      } else {
        setMessage(data.detail || 'Validation failed');
      }
    } catch (error) {
      setMessage('Validation failed: ' + error.message);
    }
  };

  return (
    <div className="page">
      <h1>Validate Account</h1>
      <form className="form" onSubmit={handleValidate}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Validation Code"
          value={validationCode}
          onChange={(e) => setValidationCode(e.target.value)}
          required
        />
        <button type="submit">Validate</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Validate;
