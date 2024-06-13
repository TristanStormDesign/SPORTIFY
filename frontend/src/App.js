import React, { useState } from 'react'; // Import React and useState hook
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Router, Route, Routes, Navigate from react-router-dom
import Navbar from './components/Navbar'; // Import Navbar component
import Footer from './components/Footer'; // Import Footer component
import Home from './pages/Home'; // Import Home page component
import Products from './pages/Products'; // Import Products page component
import LoginPage from './pages/LoginPage'; // Import LoginPage page component
import SignUpPage from './pages/SignUpPage'; // Import SignUpPage page component
import CartPage from './pages/CartPage'; // Import CartPage page component
import Admin from './pages/Admin'; // Import Admin page component
import './App.css'; // Import the CSS file

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State for user login status
  const [userEmail, setUserEmail] = useState(''); // State for user email
  const [cartItems, setCartItems] = useState([]); // State for cart items

  // Function to handle user logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUserEmail('');
  };

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Display Navbar component if user is logged in */}
        {loggedIn && <Navbar loggedIn={loggedIn} userEmail={userEmail} onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            {/* Define routes for different pages */}
            <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/products" element={loggedIn ? <Products addToCart={addToCart} /> : <Navigate to="/login" />} />
            <Route path="/cart" element={loggedIn ? <CartPage cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={loggedIn ? <Admin addToCart={addToCart} /> : <Navigate to="/admin" />} />
          </Routes>
        </div>
        <Footer /> {/* Display Footer component */}
      </div>
    </Router>
  );
};

export default App;
