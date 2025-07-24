// src/pages/AllBooksPage.jsx
// import React from 'react';
// import { allBooks } from '../../data/books.js';
import BookDetailCard from '../BookDetailCard';

// Component ab 'onAddToCart' function bhi lega
// src/pages/AllBooksPage.jsx
import React, { useState, useEffect } from 'react';


function AllBooksPage({ onAddToCart, onAddToWishlist }) { // onAddToWishlist ko bhi yahan lein
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Yeh function component ke load hote hi backend se data fetch karega
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Khali array ka matlab hai ki yeh effect sirf ek baar chalega

  // Jab tak data load ho raha hai, yeh dikhayein
  if (loading) {
    return <div className="text-center text-2xl font-semibold py-20">Loading books...</div>;
  }

  // Agar koi error aaye, to yeh dikhayein
  if (error) {
    return <div className="text-center py-20 text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Our Entire Collection</h1>
          <p className="mt-4 text-lg text-gray-600">Discover your next great read from our library.</p>
        </div>

        <div>
          {books.length > 0 ? (
            books.map(book => (
              <BookDetailCard 
                key={book._id} // Database se aayi hui unique ID ka istemaal karein
                book={book} 
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist} // Wishlist function ko pass karein
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl">No books have been added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllBooksPage;
