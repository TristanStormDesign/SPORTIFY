import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="products-header">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </header>
      <div className="products-container">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-block">
            <img src={`http://localhost:5000/uploads/${product.imageUrl}`} alt={product.name} className="product-image" />
            <span>Name: {product.name}</span>
            <span>Price: R{product.price.toFixed(2)}</span>
            <p>Description: {product.description}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
