
// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Link ko import karein

// Footer ab App.jsx se 'navigateTo' function lega
function Footer({ navigateTo }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex items-center">
                <svg className="h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-white text-2xl font-bold ml-2">Book Haven</span>
            </Link>
            <p className="text-gray-400 text-base">
              Your gateway to a universe of stories.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
                <ul className="mt-4 space-y-4">
                  {/* ✅ In links ko buttons mein badal diya gaya hai */}
                  <li><button onClick={() => navigateTo('home')} className="text-base text-gray-300 hover:text-white">Home</button></li>
                  <li><button onClick={() => navigateTo('allbooks')} className="text-base text-gray-300 hover:text-white">All Books</button></li>
                  <li><button onClick={() => navigateTo('categories-section')} className="text-base text-gray-300 hover:text-white">Categories</button></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><button onClick={() => navigateTo('home')} className="text-base text-gray-300 hover:text-white">Help Center</button></li>
                  <li><button onClick={() => navigateTo('home')} className="text-base text-gray-300 hover:text-white">Contact Us</button></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><button onClick={() => navigateTo('about-section')} className="text-base text-gray-300 hover:text-white">About</button></li>
                  <li><button onClick={() => navigateTo('home')} className="text-base text-gray-300 hover:text-white">Blog</button></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><button onClick={() => navigateTo('home')} className="text-base text-gray-300 hover:text-white">Privacy</button></li>
                  <li><button onClick={() => navigateTo('home')} className="text-base text-gray-300 hover:text-white">Terms</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">&copy; 2024 Book Haven, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
