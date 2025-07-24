// src/components/pages/BookDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookDetailCard from '../BookDetailCard';
import Reviews from '../Reviews';

function BookDetailPage({ onAddToCart, user, token }) {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { bookId } = useParams();

    const fetchBook = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/books/${bookId}`);
            if (!response.ok) throw new Error('Book not found');
            const data = await response.json();
            setBook(data);
        } catch (error) {
            console.error("Failed to fetch book:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [bookId]);

    if (loading) return <div className="text-center p-20">Loading...</div>;
    if (!book) return <div className="text-center p-20">Book not found.</div>;

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link to="/books" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                        &larr; Back to All Books
                    </Link>
                </div>
                <BookDetailCard book={book} onAddToCart={onAddToCart} />
                <Reviews book={book} user={user} token={token} onReviewAdded={fetchBook} />
            </div>
        </div>
    );
}

export default BookDetailPage;
