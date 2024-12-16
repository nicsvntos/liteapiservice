import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Validate() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(location.state?.username || '');
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState('');

  // Get the validation code from the location state
  const validationCode = location.state?.validationCode;

  const handleValidate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/validate?username=${username}&code=${inputCode}`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Account validated successfully!');
        // Navigate to signin page after successful validation
        setTimeout(() => {
          navigate('/signin');
        }, 1500);
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
      <div className="form">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Display the validation code */}
        {validationCode && (
          <div className="validation-code-display">
            <label>Your Validation Code:</label>
            <div className="code-box">{validationCode}</div>
            <p className="code-instruction">Please enter this code below to validate your account</p>
          </div>
        )}

        <label htmlFor="validationCode">Enter Validation Code:</label>
        <input
          id="validationCode"
          type="text"
          placeholder="Enter the code shown above"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        
        <button onClick={handleValidate}>Validate</button>
        {message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>
          {message}
        </p>}
      </div>
    </div>
  );
}

export default Validate;
