// Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import LoginModal from './LoginModal';

function Admin() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(true);
    const productsPerPage = 4;

    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const handleSearch = (query) => {
      setSearchQuery(query);
      const filtered = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredProducts(filtered);
    };

    const handleAddProduct = async (product) => {
      try {
        await axios.post('http://localhost:5000/api/products', product);
        fetchProducts();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };

    const handleEditProduct = async (product) => {
      try {
        await axios.put(`http://localhost:5000/api/products/${product._id}`, product);
        fetchProducts();
        setIsEditing(false);
        setSelectedProduct(null);
      } catch (error) {
        console.error('Error editing product:', error);
      }
    };

    const handleDeleteProduct = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };

    const handleEditClick = (product) => {
      setSelectedProduct(product);
      setIsEditing(true);
    };

    const handleFormClose = () => {
      setIsEditing(false);
      setSelectedProduct(null);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const ProductForm = ({ product, onClose, onSave }) => {
      const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
      });

      useEffect(() => {
        if (product) {
          setFormData(product);
        }
      }, [product]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
      };

      return (
        <div className="product-form">
          <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
      );
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <div>
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={() => setIsAuthenticated(true)}
          />
        )}
        {isAuthenticated ? (
          <>
            <header className="products-header">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </header>
            {isEditing && (
              <ProductForm
                product={selectedProduct}
                onClose={handleFormClose}
                onSave={selectedProduct ? handleEditProduct : handleAddProduct}
              />
            )}
            <div className="products-container">
              {currentProducts.map(product => (
                <div key={product._id} className="product-block">
                  <span>{product.name}</span>
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </div>
              ))}
              {!isEditing && (
                <div className="product-block add-product-block" onClick={() => setIsEditing(true)}>
                  <span>Add New Product</span>
                </div>
              )}
            </div>
            <div className="pagination">
              {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                <button key={i + 1} onClick={() => paginate(i + 1)}>{i + 1}</button>
              ))}
            </div>
          </>
        ) : (
          <div>Please log in to view the admin content.</div>
        )}
      </div>
    );
  };

export default Admin;
