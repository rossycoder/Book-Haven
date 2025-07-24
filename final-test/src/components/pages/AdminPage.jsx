// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';

// This is the modal for editing a book
function EditBookModal({ book, onUpdate, onClose }) {
    const [formData, setFormData] = useState(book);

    useEffect(() => {
        setFormData(book);
    }, [book]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Title" />
                    <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Author" />
                    <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Price" />
                    <textarea name="story" value={formData.story} onChange={handleChange} className="w-full p-2 border rounded h-24" placeholder="Story"></textarea>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// This is the form for adding a new book
function AddBookForm({ onBookAdded }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImg, setCoverImg] = useState(null);
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Novels');
    const [story, setStory] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('story', story);
        if (coverImg) {
            formData.append('coverImg', coverImg);
        }

        try {
            const response = await fetch('http://localhost:5000/api/books', {
                method: 'POST',
                headers: { 'x-auth-token': token },
                body: formData,
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Failed to add book.');
            }
            const newBook = await response.json();
            setSuccess(`Successfully added "${newBook.title}"!`);
            onBookAdded(newBook);
            setTitle(''); setAuthor(''); setCoverImg(null); setPrice(''); setCategory('Novels'); setStory('');
            if(document.getElementById('coverImgInput')) {
               document.getElementById('coverImgInput').value = null;
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800">Add a New Book</h3>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <input type="text" placeholder="Book Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 border rounded" />
            <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required className="w-full p-2 border rounded" />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                <input id="coverImgInput" type="file" onChange={e => setCoverImg(e.target.files[0])} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            </div>
            <input type="text" placeholder="Price (e.g., $12.99 or Free)" value={price} onChange={e => setPrice(e.target.value)} required className="w-full p-2 border rounded" />
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded">
                <option>Romantic</option><option>Finance</option><option>Education</option><option>Novels</option><option>Sci-Fi</option><option>History</option>
            </select>
            <textarea placeholder="Story / Description" value={story} onChange={e => setStory(e.target.value)} required className="w-full p-2 border rounded h-28"></textarea>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-bold">Add Book</button>
        </form>
    );
}

// Main Admin Page Component
function AdminPage({ user, token }) {
    const [books, setBooks] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:5000/api/books');
            const data = await response.json();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    const handleBookAdded = (newBook) => {
        setBooks(prevBooks => [newBook, ...prevBooks]);
    };

    const handleEditClick = (book) => {
        setCurrentBook(book);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (bookId) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
                    method: 'DELETE',
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error('Failed to delete book.');
                setBooks(books.filter(b => b._id !== bookId));
            } catch (err) {
                console.error(err);
                alert("Error deleting book. Make sure you are logged in.");
            }
        }
    };

    const handleUpdate = async (updatedBook) => {
        try {
            const response = await fetch(`http://localhost:5000/api/books/${updatedBook._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify(updatedBook)
            });
            if (!response.ok) throw new Error('Failed to update book.');
            const data = await response.json();
            setBooks(books.map(b => (b._id === data._id ? data : b)));
            setIsEditModalOpen(false);
        } catch (err) {
            console.error(err);
            alert("Error updating book. Make sure you are logged in.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    {/* ✅ Yahan 'Addbookform' ko 'AddBookForm' se badla gaya hai */}
                    <AddBookForm onBookAdded={handleBookAdded} />
                </div>
                <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Existing Books ({books.length})</h3>
                    <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
                        {books.map(book => (
                            <div key={book._id} className="p-3 border rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{book.title}</p>
                                    <p className="text-sm text-gray-500">by {book.author} (Added by: {book.createdBy ? book.createdBy.name : 'Unknown'})</p>
                                </div>
                                {user && book.createdBy && user.id === book.createdBy._id && (
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEditClick(book)} className="p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500">Edit</button>
                                        <button onClick={() => handleDelete(book._id)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isEditModalOpen && <EditBookModal book={currentBook} onUpdate={handleUpdate} onClose={() => setIsEditModalOpen(false)} />}
        </div>
    );
}

export default AdminPage;
