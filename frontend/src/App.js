import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail('');
  };

  return (
    <Router>
      <div>
        {loggedIn && <Navbar loggedIn={loggedIn} userEmail={userEmail} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/products" element={loggedIn ? <Products /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
