import React, { useState } from 'react';

const AuthForm = ({ onSubmit, formType }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    code: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-form">
      <h2>{formType}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>
        
        {formType === 'Register' && (
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
        )}

        {formType === 'Validate' ? (
          <div className="form-group">
            <input
              type="text"
              name="code"
              placeholder="Validation Code"
              onChange={handleChange}
              required
            />
          </div>
        ) : (
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit">{formType}</button>
      </form>
    </div>
  );
};

export default AuthForm;
