import React, { useState } from 'react';
import axios from 'axios';
import './CartPage.css';

const CartPage = ({ cartItems, setCartItems }) => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckout = async () => {
    try {
      const orderItems = cartItems.map(item => ({
        product: item._id,
        quantity: 1, // Assuming quantity is 1 for simplicity
      }));

      const order = {
        items: orderItems,
        totalPrice: cartItems.reduce((total, item) => total + item.price, 0).toFixed(2),
      };

      await axios.post('http://localhost:5000/api/orders', order);
      setIsCheckedOut(true);
      setCartItems([]);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div className="cart-container">
      {isCheckedOut ? (
        <div className="thank-you-message">
          <h2>Thank you for your purchase!</h2>
        </div>
      ) : (
        <div>
          <h2>Cart</h2>
          {cartItems.length > 0 ? (
            <form>
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div>
                    <p><strong>{item.name}</strong></p>
                    <p>Price: R{item.price.toFixed(2)}</p>
                    <p>{item.description}</p>
                  </div>
                  <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                </div>
              ))}
              <div className="cart-total">
                <h3>Total: R{totalPrice}</h3>
              </div>
              <button type="button" className="checkout-button" onClick={handleCheckout}>Checkout</button>
            </form>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;

