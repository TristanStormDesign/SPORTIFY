const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(400).json({ error: 'Error creating user.' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        // Check if password is correct
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        // If user and password are correct, send success response with user information
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(400).json({ error: 'Error logging in.' });
    }
});

module.exports = router;
