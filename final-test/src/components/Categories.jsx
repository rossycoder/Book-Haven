// src/components/Categories.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

// Yeh array bilkul aapke data se match karna chahiye
const categories = [
  { name: 'Romantic', icon: '💖' },
  { name: 'Finance', icon: '💰' },
  { name: 'Education', icon: '🎓' },
  { name: 'Novels', icon: '📚' }, // Dhyaan dein: 'Novels' (S ke saath)
  { name: 'Sci-Fi', icon: '🚀' },
  { name: 'History', icon: '🏛️' },
];

function Categories() { // onCategorySelect prop ki ab zaroorat nahi
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Browse By Category</h2>
          <p className="mt-4 text-lg text-gray-500">Find your next favorite book from our wide range of genres.</p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Link // Use Link component for navigation
              key={category.name}
              to={`/category/${category.name}`} // Correct path for CategoryPage
              className="flex items-center px-6 py-3 text-lg font-semibold rounded-full shadow-md transition-all duration-300 bg-white text-gray-800 hover:bg-indigo-600 hover:text-white hover:scale-105"
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
