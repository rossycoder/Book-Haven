// src/components/pages/OrderHistoryPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OrderHistoryPage({ token }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) {
                setError("You must be logged in to view your orders.");
                setLoading(false);
                return;
            }
            try {
                const response = await fetch('http://localhost:5000/api/orders/myorders', {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch orders.');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error.message);
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [token]);

    const getImageUrl = (coverImg) => {
        return coverImg ? `http://localhost:5000/${coverImg.replace(/\\/g, '/')}` : `https://placehold.co/48x64/e0e0e0/7f7f7f?text=N/A`;
    };

    if (loading) return <p className="text-center p-8 text-xl">Loading your orders...</p>;
    if (error) return <p className="text-center p-8 text-xl text-red-500">{error}</p>;

    return (
        <div className="bg-gray-100 py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Order History</h1>
                {orders.length === 0 ? (
                    <div className="text-center bg-white p-10 rounded-lg shadow-md">
                        <p className="text-xl text-gray-600">You have no past orders.</p>
                        <Link to="/books" className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-4 mb-4 gap-4">
                                    <div>
                                        <p className="font-bold text-lg text-gray-800">Order ID: <span className="font-normal text-gray-600">{order._id}</span></p>
                                        <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="font-bold text-xl text-indigo-600">${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</p>
                                </div>
                                <ul className="space-y-4">
                                    {order.orderItems.map((item, index) => (
                                        <li key={index} className="flex items-center">
                                            <img src={getImageUrl(item.coverImg)} alt={item.title} className="h-20 w-14 object-cover rounded shadow-sm" />
                                            <div className="ml-4">
                                                <p className="font-semibold text-gray-900">{item.title}</p>
                                                <p className="text-sm text-gray-500">{item.author}</p>
                                            </div>
                                            <p className="ml-auto font-medium text-gray-700">{item.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderHistoryPage;
