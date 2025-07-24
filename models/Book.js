const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const BookSchema = new mongoose.Schema({
  // ... baaki saari fields
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImg: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  story: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviews: [reviewSchema],
  averageRating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);