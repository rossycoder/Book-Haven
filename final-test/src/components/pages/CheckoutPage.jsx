import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutPage({ cartItems, user, onOrderSubmit, token }) {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    country: 'Pakistan',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) || 0), 0);
    const totalPrice = subtotal + (subtotal * 0.05);

    const orderData = {
        orderItems: cartItems.map(item => ({
            title: item.title, author: item.author, coverImg: item.coverImg, price: item.price
        })),
        shippingInfo,
        totalPrice,
    };

    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || 'Failed to place order.');
        }

        onOrderSubmit();

    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };
  
  if (!cartItems || cartItems.length === 0) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Your cart is empty.</h2>
            <button onClick={() => navigate('/books')} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg">Shop for Books</button>
        </div>
    )
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) || 0), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Checkout</h2>

        <form onSubmit={handleSubmit} className="mt-12 lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
            {/* ✅ Yahan saare input fields add kiye gaye hain */}
            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="mt-1">
                    <input type="text" name="name" id="name" value={shippingInfo.name} onChange={handleInputChange} required className="block w-full border-gray-300 rounded-md shadow-sm p-2" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <div className="mt-1">
                    <input type="text" name="address" id="address" value={shippingInfo.address} onChange={handleInputChange} required className="block w-full border-gray-300 rounded-md shadow-sm p-2" />
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <div className="mt-1">
                    <input type="text" name="city" id="city" value={shippingInfo.city} onChange={handleInputChange} required className="block w-full border-gray-300 rounded-md shadow-sm p-2" />
                  </div>
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <div className="mt-1">
                    <input type="text" name="postalCode" id="postalCode" value={shippingInfo.postalCode} onChange={handleInputChange} required className="block w-full border-gray-300 rounded-md shadow-sm p-2" />
                  </div>
                </div>
                 <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <div className="mt-1">
                    <input type="text" name="phone" id="phone" value={shippingInfo.phone} onChange={handleInputChange} required className="block w-full border-gray-300 rounded-md shadow-sm p-2" />
                  </div>
                </div>
              </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <h3 className="text-lg font-medium text-gray-900">Order summary</h3>
            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <ul className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                        <li key={item._id + '-' + index} className="flex py-4 px-4 sm:px-6">
                            <div className="flex-shrink-0">
                                <img src={`http://localhost:5000/${item.coverImg.replace(/\\/g, '/')}`} alt={item.title} className="w-20 rounded-md" />
                            </div>
                            <div className="ml-4 flex-1 flex flex-col justify-center">
                                <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                                <p className="mt-1 text-sm text-gray-500">{item.price}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-sm text-gray-600"><p>Subtotal</p><p>${subtotal.toFixed(2)}</p></div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2"><p>Tax (5%)</p><p>${tax.toFixed(2)}</p></div>
                    <div className="flex justify-between text-base font-medium text-gray-900 mt-4 border-t pt-4"><p>Order total</p><p>${total.toFixed(2)}</p></div>
                </div>
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <button type="submit" disabled={loading} className="w-full bg-indigo-600 border rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
                  {loading ? 'Placing Order...' : 'Confirm Order'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;