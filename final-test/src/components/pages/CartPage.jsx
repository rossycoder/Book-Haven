// src/components/pages/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage({ cartItems, removeFromCart }) {
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce((sum, item) => {
    // Ensure price is treated as a number, removing '$' if present
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return sum + price;
  }, 0);

  const tax = subtotal * 0.05; // 5% tax example
  const total = subtotal + tax;

  const getImageUrl = (coverImg) => {
      return coverImg ? `http://localhost:5000/${coverImg.replace(/\\/g, '/')}` : `https://placehold.co/64x96/e0e0e0/7f7f7f?text=No+Image`;
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Your Shopping Cart</h1>
          <button
            onClick={() => navigate('/books')}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
          >
            &larr; Continue Shopping
          </button>
        </div>

        {cartItems.length > 0 ? (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white shadow-xl rounded-lg p-6">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <li key={item._id + '-' + index} className="flex py-6">
                    <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={getImageUrl(item.coverImg)} alt={item.title} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.title}</h3>
                          <p className="ml-4">{item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.author}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty 1</p>
                        <div className="flex">
                          <button onClick={() => removeFromCart(index)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-xl rounded-lg p-6 sticky top-28">
                <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600">Tax estimate (5%)</p>
                    <p className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-base font-medium text-gray-900">Order total</p>
                    <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty.</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added any books yet!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
