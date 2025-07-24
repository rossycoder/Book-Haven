// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout, cartItemCount }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search/${searchTerm.trim()}`);
      setSearchTerm('');
      setIsMobileMenuOpen(false);
    }
  };

  // User ka naam chhota karne ke liye helper function
  const getDisplayName = (name) => {
      if (!name) return '';
      if (name.length > 15) {
          return `${name.substring(0, 12)}...`;
      }
      return name;
  };
  
  // Mobile menu ke links par click handle karne ke liye
  const handleMobileLinkClick = (path) => {
      navigate(path);
      setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <svg className="h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="text-gray-800 text-2xl font-bold ml-2">Book Haven</span>
          </Link>

          {/* ✅ Center: Navigation Links (Yeh section wapas add kiya gaya hai) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-semibold">Home</Link>
            <Link to="/books" className="text-gray-600 hover:text-indigo-600 font-semibold">Books</Link>
            <a href="/#categories-section" className="text-gray-600 hover:text-indigo-600 font-semibold">Categories</a>
            <a href="/#about-section" className="text-gray-600 hover:text-indigo-600 font-semibold">About Us</a>
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <div className="relative">
                <input type="text" placeholder="Search and press Enter..." className="border border-gray-300 rounded-full py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSearch} />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600">
              <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 font-semibold">
                  Hi, {getDisplayName(user.name)}
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                  <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</Link>
                  <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 font-semibold">Login</Link>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-indigo-600 focus:outline-none"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg></button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu Links (Updated) */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:bg-gray-100 block w-full text-left px-3 py-2 rounded-md font-semibold">Home</Link>
          <Link to="/books" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:bg-gray-100 block w-full text-left px-3 py-2 rounded-md font-semibold">Books</Link>
          <a href="/#categories-section" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:bg-gray-100 block w-full text-left px-3 py-2 rounded-md font-semibold">Categories</a>
          <a href="/#about-section" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:bg-gray-100 block w-full text-left px-3 py-2 rounded-md font-semibold">About Us</a>
          
          {user ? (
            <>
              <Link to="/my-orders" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:bg-gray-100 block w-full text-left px-3 py-2 rounded-md font-semibold">My Orders</Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:bg-gray-100 block w-full text-left px-3 py-2 rounded-md font-semibold">Admin Panel</Link>
              <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="bg-red-500 text-white block w-full text-center px-3 py-2 rounded-md font-semibold mt-4">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-indigo-600 text-white block w-full text-center px-3 py-2 rounded-md font-semibold mt-4">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
