import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import Admin from './pages/Admin';
import './App.css'; // Import the CSS file

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail('');
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <Router>
      <div className="app-container">
        {loggedIn && <Navbar loggedIn={loggedIn} userEmail={userEmail} onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/products" element={loggedIn ? <Products addToCart={addToCart} /> : <Navigate to="/login" />} />
            <Route path="/cart" element={loggedIn ? <CartPage cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={loggedIn ? <Admin addToCart={addToCart} /> : <Navigate to="/admin" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
