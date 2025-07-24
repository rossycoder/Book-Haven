const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');


// @route   POST api/orders
// @desc    Create a new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { orderItems, shippingInfo, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items in cart' });
    }
    if (!shippingInfo) {
      return res.status(400).json({ message: 'Shipping information is required' });
    }

    const order = new Order({
      user: req.user.id,
      orderItems,
      shippingInfo,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("Order Creation Error:", error);
    // Mongoose validation error ke liye specific message bhejein
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET api/orders/myorders
// @desc    Get logged in user's orders
router.get('/myorders', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;