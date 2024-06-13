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
    const [loginModalVisible, setLoginModalVisible] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [orders, setOrders] = useState([]);
    const productsPerPage = 4;

    useEffect(() => {
        fetchProducts();
        fetchOrders();
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

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleAddProduct = async (product) => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            formData.append('image', imageFile);

            await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async (product) => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            if (imageFile) formData.append('image', imageFile);

            await axios.put(`http://localhost:5000/api/products/${product._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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

    const handleLoginClose = () => {
        setLoginModalVisible(false);
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setLoginModalVisible(false);
    };

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

        const handleImageChange = (e) => {
            setImageFile(e.target.files[0]);
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
                    <div>
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        );
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div>
            {loginModalVisible && (
                <LoginModal
                    onClose={handleLoginClose}
                    onLogin={handleLoginSuccess}
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
                                <img src={`http://localhost:5000/uploads/${product.imageUrl}`} alt={product.name} className="product-image" />
                                <div className="product-details">
                                    <span>{product.name}</span>
                                    <button onClick={() => handleEditClick(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                </div>
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
                    <div className="orders-section">
                        <h2>Orders</h2>
                        <div className="orders-container">
                            {orders.map(order => (
                                <div key={order._id} className="order-block">
                                    <p><strong>Order ID:</strong> {order._id}</p>
                                    <p><strong>Total Price:</strong> R{order.totalPrice.toFixed(2)}</p>
                                    <div>
                                        <strong>Items:</strong>
                                        {order.items.map(item => (
                                            <div key={item.product._id}>
                                                <p>Product: {item.product.name}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Price: R{item.product.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div>Please log in to view the admin content.</div>
            )}
        </div>
    );
}

export default Admin;
