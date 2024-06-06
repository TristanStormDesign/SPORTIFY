import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';
import Logo from '../images/Logo.png'; // Import the logo image

const LoginPage = ({ setLoggedIn, setUserEmail }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); // Clear any previous errors
    console.log('Attempting to login...');

    try {
      const response = await axios.post('/api/users/login', { email: username, password });
      console.log('Login successful:', response.data);

      // Set the logged-in state and user email
      setLoggedIn(true);
      setUserEmail(username);

      // Redirect to the home page after successful login
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'An error occurred during login.');
    }
  };

  return (
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <img src={Logo} alt="Logo" />
        <div className="form">
          <div className="inputBox">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="error">{error}</div>
          <div className="inputBox">
            <button type="button" onClick={handleLogin}>Login</button>
          </div>
        </div>
        <div className="signup-link">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
