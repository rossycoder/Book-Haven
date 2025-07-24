// src/components/FeaturedBooks.jsx
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard'; // BookCard component ko import karein

function FeaturedBooks() {
    const [activeTab, setActiveTab] = useState('popular');
    const [popularBooks, setPopularBooks] = useState([]);
    const [freeBooks, setFreeBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError('');
            try {
                // Popular books fetch karein (sabse zyaada rating waali 4 kitaabein)
                const popularRes = await fetch('http://localhost:5000/api/books?sortBy=averageRating&order=desc&limit=4');
                const popularData = await popularRes.json();
                if (!popularRes.ok) throw new Error('Could not fetch popular books.');
                setPopularBooks(popularData);

                // Free books fetch karein (4 free kitaabein)
                const freeRes = await fetch('http://localhost:5000/api/books?price=Free&limit=4');
                const freeData = await freeRes.json();
                if (!freeRes.ok) throw new Error('Could not fetch free books.');
                setFreeBooks(freeData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []); // Yeh effect sirf ek baar chalega

    const booksToShow = activeTab === 'popular' ? popularBooks : freeBooks;

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Books</h2>
                    <p className="mt-4 text-lg text-gray-500">Explore our handpicked collection of popular and free books.</p>
                </div>
                
                <div className="mt-10 flex justify-center">
                    <div className="bg-gray-200 p-1 rounded-lg flex space-x-1">
                        <button
                            onClick={() => setActiveTab('popular')}
                            className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'popular' ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                        >
                            Popular
                        </button>
                        <button
                            onClick={() => setActiveTab('free')}
                            className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'free' ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                        >
                            Free Books
                        </button>
                    </div>
                </div>

                <div className="mt-12 grid gap-x-8 gap-y-20 justify-items-center sm:grid-cols-2 lg:grid-cols-4">
                    {loading && <p className="col-span-full text-center">Loading...</p>}
                    {error && <p className="col-span-full text-center text-red-500">{error}</p>}
                    {!loading && !error && booksToShow.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeaturedBooks;
