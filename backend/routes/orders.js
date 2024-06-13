const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.product');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new order
router.post('/', async (req, res) => {
    try {
        const { items, totalPrice } = req.body;
        const newOrder = new Order({ items, totalPrice });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
