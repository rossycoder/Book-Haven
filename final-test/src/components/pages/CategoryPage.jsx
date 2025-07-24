import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetailCard from '../BookDetailCard';

function CategoryPage({ onAddToCart }) {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooksByCategory = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/books?category=${categoryName}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch books for category: ${categoryName}`);
                }
                const data = await response.json();
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (categoryName) {
            fetchBooksByCategory();
        }
    }, [categoryName]);

    return (
        <div className="bg-gray-100 py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">{categoryName} Books</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
                    >
                        &larr; Back to Home
                    </button>
                </div>

                {loading && <p className="text-center text-xl mt-16">Loading...</p>}
                {error && <p className="text-center text-red-500 text-xl mt-16">{error}</p>}

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
                            <p className="text-center text-gray-500 text-xl mt-16">No books found in this category.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryPage;
