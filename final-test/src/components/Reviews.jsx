// src/components/Reviews.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Star rating ke liye helper component
const StarRatingInput = ({ rating, setRating }) => {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    onClick={() => setRating ? setRating(star) : null}
                    className={`h-6 w-6 ${setRating ? 'cursor-pointer' : ''} ${rating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

function Reviews({ book, user, token, onReviewAdded }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (rating === 0 || comment.trim() === '') {
            setError('Please provide a rating and a comment.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:5000/api/books/${book._id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({ rating, comment }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to submit review.");
            
            setRating(0);
            setComment('');
            onReviewAdded(); // Parent ko batayein ki review add ho gaya hai
            alert('Review submitted successfully!');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="mt-6 space-y-6">
                {book.reviews && book.reviews.length === 0 && <p className="text-gray-500">No reviews yet. Be the first to review!</p>}
                {book.reviews && book.reviews.map((review) => (
                    <div key={review._id} className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center mb-2">
                            <StarRatingInput rating={review.rating} />
                            <strong className="ml-4 text-gray-800">{review.user ? review.user.name : 'Anonymous'}</strong>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-900">Write a Customer Review</h3>
                {user ? (
                    <form onSubmit={submitHandler} className="mt-4 space-y-4 p-6 bg-gray-50 border rounded-lg">
                         {error && <p className="text-red-500 bg-red-100 p-3 rounded">{error}</p>}
                        <div>
                            <label className="block font-semibold mb-2">Your Rating</label>
                            <StarRatingInput rating={rating} setRating={setRating} />
                        </div>
                        <div>
                            <label htmlFor="comment" className="block font-semibold mb-2">Your Comment</label>
                            <textarea
                                id="comment"
                                rows="4"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400">
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                ) : (
                    <p className="mt-4 text-gray-600">Please <Link to="/login" className="text-indigo-600 font-bold hover:underline">sign in</Link> to write a review.</p>
                )}
            </div>
        </div>
    );
}

export default Reviews;