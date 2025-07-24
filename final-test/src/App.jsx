// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';

// Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FlashMessage from './components/FlashMessage';
import HomePage from './components/pages/HomePage';
import AllBooksPage from './components/pages/AllBooksPage';
import CategoryPage from './components/pages/CategoryPage';
import SearchPage from './components/pages/SearchPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import CartPage from './components/pages/CartPage';
import AdminPage from './components/pages/AdminPage';
import BookDetailPage from './components/pages/BookDetailPage';
import OrderHistoryPage from './components/pages/OrderHistoryPage';
import CheckoutPage from './components/pages/CheckoutPage';

function App() {
  const [cart, setCart] = useState([]);
  const [flashMessage, setFlashMessage] = useState({ message: '', type: 'info' });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/user', {
            headers: { 'x-auth-token': storedToken },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setToken(storedToken);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) { console.error("Token verification failed:", error); }
      }
      setAuthLoading(false);
    };
    verifyUser();
  }, []);

  const handleAuthSuccess = (data, action, from) => {
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    const message = action === 'login' ? `Welcome back, ${data.user.name}!` : `Welcome, ${data.user.name}!`;
    setFlashMessage({ message, type: 'success' });
    navigate(from || '/', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setFlashMessage({ message: "You have been logged out.", type: 'info' });
    navigate('/');
  };

  const handleAddToCart = (book) => {
    if (!user) {
      setFlashMessage({ message: 'Please log in to add items to your cart.', type: 'error' });
      navigate('/login', { state: { from: location } });
      return;
    }
    setCart([...cart, book]);
    setFlashMessage({ message: `"${book.title}" has been added to your cart!`, type: 'success' });
  };
  
  const handleRemoveFromCart = (itemIndex) => {
    setCart(cart.filter((_, index) => index !== itemIndex));
  };

  const handleOrderSubmit = () => {
      setCart([]);
      setFlashMessage({ message: '✅ Your order has been placed successfully!', type: 'success' });
      navigate('/');
  };

  function ProtectedRoute({ children }) {
    if (authLoading) return <div className="text-center p-20">Loading...</div>;
    return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <FlashMessage message={flashMessage.message} type={flashMessage.type} onHide={() => setFlashMessage({ message: '', type: 'info' })} />
      <Navbar user={user} onLogout={handleLogout} cartItemCount={cart.length} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<AllBooksPage onAddToCart={handleAddToCart} />} />
          <Route path="/books/:bookId" element={<BookDetailPage onAddToCart={handleAddToCart} user={user} token={token} />} />
          <Route path="/category/:categoryName" element={<CategoryPage onAddToCart={handleAddToCart} />} />
          <Route path="/search/:searchTerm" element={<SearchPage onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage cartItems={cart} removeFromCart={handleRemoveFromCart} />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleAuthSuccess} />} />
          <Route path="/signup" element={<SignupPage onSignupSuccess={handleAuthSuccess} />} />
          <Route path="/admin" element={<ProtectedRoute><AdminPage user={user} token={token} /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage cartItems={cart} user={user} onOrderSubmit={handleOrderSubmit} token={token} /></ProtectedRoute>} />
          <Route path="/my-orders" element={<ProtectedRoute><OrderHistoryPage token={token} /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;