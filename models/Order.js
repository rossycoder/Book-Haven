
// models/Order.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [
    {
      title: { type: String, required: true },
      author: { type: String, required: true },
      coverImg: { type: String, required: true },
      price: { type: String, required: true },
    },
  ],
  shippingInfo: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false, // Hum maan rahe hain ki yeh Cash on Delivery hai
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);