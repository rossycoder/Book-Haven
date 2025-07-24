// src/components/BookDetailCard.jsx
import React from 'react';

// Helper component to render star ratings
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <svg
                key={i}
                className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
            </svg>
        );
    }
    return <div className="flex">{stars}</div>;
};

// Component ab 'onAddToWishlist' function bhi lega
function BookDetailCard({ book, onAddToCart, onAddToWishlist }) {
    const { title, author, coverImg, price, story, category, averageRating, numReviews } = book;

    // Image ka poora URL banayein
    // Ensure coverImg is not null or undefined before attempting to replace
    const imageUrl = coverImg ? `http://localhost:5000/${coverImg.replace(/\\/g, '/')}` : '';

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden my-8 transform hover:scale-[1.02] transition-transform duration-300">
            {/* 3D Book Image */}
            <div className="md:w-1/3 p-8 flex justify-center items-center">
                <div className="group [perspective:1200px]">
                    <div className="relative h-96 w-64 rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(20deg)]">
                        {imageUrl ? (
                            <img
                                className="absolute h-full w-full rounded-xl object-cover shadow-xl"
                                src={imageUrl}
                                alt={`${title} cover`}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.src = `https://placehold.co/300x400/aabbcc/ffffff?text=No+Image`; // Placeholder on error
                                }}
                            />
                        ) : (
                            <div className="absolute h-full w-full rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 text-center">
                                No Image Available
                            </div>
                        )}
                        <div className="absolute left-0 top-0 h-full w-8 bg-indigo-900 [transform:rotateY(-90deg)_translateX(-1rem)] origin-left flex items-center justify-center">
                            <span className="text-white text-xs font-bold [writing-mode:vertical-lr] transform rotate-180">{title}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Book Details */}
            <div className="md:w-2/3 p-8 flex flex-col justify-between">
                <div>
                    <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">{category}</div>
                    <h1 className="block mt-1 text-4xl leading-tight font-extrabold text-black">{title}</h1>
                    <h2 className="mt-2 text-2xl text-gray-600">{author}</h2>
                    <p className="mt-4 text-gray-500 text-lg">{story}</p>

                    {/* Rating and Reviews Section */}
                    <div className="mt-4 flex items-center">
                        {/* Average Rating Display */}
                        {averageRating !== undefined && (
                            <div className="flex items-center">
                                <StarRating rating={averageRating} />
                                <span className="ml-2 text-gray-700 font-semibold">{averageRating.toFixed(1)}</span>
                            </div>
                        )}
                        {/* Number of Reviews */}
                        {numReviews !== undefined && (
                            <span className="ml-4 text-gray-500 text-sm">
                                ({numReviews} {numReviews === 1 ? 'Review' : 'Reviews'})
                            </span>
                        )}
                        {/* Agar rating aur reviews nahi hain */}
                        {(averageRating === undefined && numReviews === undefined) && (
                            <span className="text-gray-500 text-sm">No ratings yet.</span>
                        )}
                    </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-3xl font-bold text-gray-900">{price}</span>
                    <div className="flex items-center space-x-4">
                        {/* Wishlist Button */}
                        <button 
                            onClick={() => onAddToWishlist(book)}
                            className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-500 transition-colors"
                            title="Add to Wishlist"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.318a4.5 4.5 0 010-6.364z" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => onAddToCart(book)}
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetailCard;
