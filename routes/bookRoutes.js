// FILE: routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Multer Storage Configuration (File upload ke liye)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// @route   POST /api/books
// @desc    Add a new book
router.post('/', authMiddleware, upload.single('coverImg'), async (req, res) => {
  try {
    const { title, author, price, category, story } = req.body;
    if (!req.file) {
      return res.status(400).json({ msg: 'Cover image is required' });
    }
    const newBook = new Book({
      title, author, price, category, story,
      coverImg: req.file.path,
      createdBy: req.user.id
    });
    const book = await newBook.save();
    const populatedBook = await Book.findById(book._id).populate('createdBy', 'name _id');
    res.status(201).json(populatedBook);
  } catch (err) {
    console.error("Add Book Error:", err);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/books
// @desc    Get all books, with filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { category, search, sortBy, order, price, limit } = req.query;
    let filter = {};
    let sortOptions = { createdAt: -1 };

    if (category) {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { author: { $regex: new RegExp(search, 'i') } }
      ];
    }
    if (price) {
      filter.price = price;
    }
    if (sortBy === 'averageRating' && order === 'desc') {
      sortOptions = { averageRating: -1 };
    }

    let query = Book.find(filter)
                    .populate('createdBy', 'name _id')
                    .sort(sortOptions);
    
    if (limit) {
        query = query.limit(parseInt(limit));
    }

    const books = await query;
    res.json(books);
  } catch (err) {
    console.error("Get Books Error:", err);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/books/:id
// @desc    Get a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('createdBy', 'name _id').populate('reviews.user', 'name');
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/books/:id
// @desc    Update a book
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    if (book.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    book = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).populate('createdBy', 'name _id');
    res.json(book);
  } catch (err) {
    console.error("Update Book Error:", err);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    if (book.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error("Delete Book Error:", err);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/books/:bookId/reviews
// @desc    Add a review to a book
router.post('/:bookId/reviews', authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const book = await Book.findById(req.params.bookId);

    if (book) {
      const alreadyReviewed = book.reviews.find(r => r.user.toString() === req.user.id.toString());
      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Book already reviewed' });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const review = {
        name: user.name,
        rating: Number(rating),
        comment,
        user: req.user.id,
      };

      book.reviews.push(review);
      book.numReviews = book.reviews.length;
      book.averageRating = book.reviews.reduce((acc, item) => item.rating + acc, 0) / book.reviews.length;

      await book.save();
      res.status(201).json({ message: 'Review added successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
