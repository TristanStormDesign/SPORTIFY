const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Allow requests from all origins
app.use(cors());

// Establish database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// User Routes
const userRoutes = require('./routes/userRoutes'); // Correct path to userRoutes
app.use('/api/users', userRoutes);

// Product Routes
const productRoutes = require('./routes/products'); // Path to product routes
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});