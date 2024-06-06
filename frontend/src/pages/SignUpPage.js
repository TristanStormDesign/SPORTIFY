import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';
import Logo from '../images/Logo.png';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      setMessage('User created successfully!');
      navigate('/login');
    } catch (error) {
      setMessage('Error creating user.');
    }
  };

  return (
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <img src={Logo} alt="Logo" />
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-link">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
