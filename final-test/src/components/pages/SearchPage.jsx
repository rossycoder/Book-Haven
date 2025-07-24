// src/components/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetailCard from '../BookDetailCard'; // Assuming BookDetailCard is in ../components/

// Component to display search results
function SearchPage({ onAddToCart }) {
    const { searchTerm } = useParams(); // Get searchTerm from URL parameters
    const navigate = useNavigate(); // Hook for navigation
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooksBySearch = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch books from your backend API, filtered by search term
                const response = await fetch(`http://localhost:5000/api/books?search=${searchTerm}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch books for search term: "${searchTerm}"`);
                }
                const data = await response.json();
                setBooks(data); // Set the books state with the filtered books
            } catch (err) {
                console.error("Error fetching search results:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (searchTerm) {
            fetchBooksBySearch();
        } else {
            setBooks([]);
            setLoading(false);
        }
    }, [searchTerm]); // Re-run effect when searchTerm changes

    return (
        <div className="bg-gray-100 py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">Search Results</h1>
                        <p className="mt-2 text-lg text-gray-600">Showing results for: <span className="font-bold text-indigo-600">"{searchTerm}"</span></p>
                    </div>
                    <button
                        onClick={() => navigate('/')} // Navigate back to home
                        className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out"
                    >
                        &larr; Back to Home
                    </button>
                </div>

                {loading && (
                    <p className="text-center text-gray-600 text-xl mt-16">Loading search results...</p>
                )}

                {error && (
                    <p className="text-center text-red-500 text-xl mt-16">Error: {error}</p>
                )}

                {!loading && !error && (
                    // ✅ Yahan se grid layout hata diya gaya hai
                    <div>
                        {books.length > 0 ? (
                            books.map(book => (
                                <BookDetailCard
                                    key={book._id}
                                    book={book}
                                    onAddToCart={onAddToCart}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 text-2xl mt-16">
                                Sorry, no books found for your search. Try another keyword!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
