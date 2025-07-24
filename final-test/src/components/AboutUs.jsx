// src/components/AboutUs.jsx
import React, { useState } from 'react';

// About Us section ke liye naya, interactive component
function AboutUs() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // Hum 3 pages banayenge

  const pages = [
    // Page 1
    {
      title: "Our Mission",
      content: "To ignite a universal passion for reading by making books accessible and affordable for everyone, everywhere. We believe in the power of stories to connect and inspire."
    },
    // Page 2
    {
      title: "Our Community",
      content: "Book Haven is more than a store; it's a vibrant community for book lovers. We host events, reading clubs, and author meetups to bring readers together."
    },
    // Page 3
    {
      title: "Our Promise",
      content: "We are committed to providing a curated selection of high-quality books, exceptional customer service, and a seamless shopping experience for our valued readers."
    }
  ];

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Text Content */}
          <div className="mb-16 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-white-900 sm:text-4xl tracking-tight">
              The Story of <span className="text-indigo-600">Book Haven</span>
            </h2>
            <p className="mt-6 text-xl text-white-600">
              We are more than just a bookstore; we are a community of passionate readers. Join us on our journey to explore new worlds, one page at a time.
            </p>
            <div className="mt-8 p-6 bg-white-50 rounded-lg">
                <h3 className="font-bold text-gray-800 text-lg">{pages[currentPage].title}</h3>
                <p className="mt-2 text-gray-600">{pages[currentPage].content}</p>
            </div>
          </div>

          {/* 3D Book */}
          <div className="flex justify-center items-center h-96">
            <div className="group [perspective:1500px]">
              <div
                className="relative w-72 h-96 transition-all duration-1000"
                style={{ transformStyle: 'preserve-3d', transform: `rotateY(${-25 + currentPage * 5}deg)` }}
              >
                {/* Back Cover */}
                <div className="absolute w-full h-full bg-indigo-900 rounded-lg shadow-2xl"></div>
                
                {/* Pages */}
                {pages.map((page, index) => (
                  <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full origin-left transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `rotateY(${currentPage > index ? -170 : 0}deg)`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="absolute w-full h-full bg-ivory-50 p-8 flex flex-col border-r border-gray-300">
                        <h3 className="font-serif font-bold text-xl text-gray-800 mb-4">{page.title}</h3>
                        <p className="font-serif text-gray-700 text-sm leading-relaxed">{page.content}</p>
                        <span className="absolute bottom-4 right-4 font-serif text-gray-400">{index + 1}</span>
                    </div>
                  </div>
                ))}

                {/* Front Cover */}
                <div
                  className="absolute top-0 left-0 w-full h-full bg-indigo-800 rounded-lg flex flex-col justify-center items-center p-6 text-center origin-left transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `rotateY(${currentPage > -1 ? -180 : 0}deg)`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                    <h2 className="text-white text-3xl font-serif" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Our Story</h2>
                    <p className="text-yellow-200 mt-4">Discover Book Haven</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Page Turn Buttons */}
          <div className="lg:col-start-2 flex justify-center mt-8 space-x-4">
              <button onClick={handlePrevPage} disabled={currentPage === 0} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300">
                Previous Page
              </button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700">
                Next Page
              </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutUs;
