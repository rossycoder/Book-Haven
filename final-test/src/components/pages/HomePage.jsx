// src/components/pages/HomePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Sahi import paths (ek level upar jaakar)
import Hero from '../Hero';
import FeaturedBooks from '../FeaturedBooks';
import Categories from '../Categories';
import AboutUs from '../AboutUs';
import Newsletter from '../Newsletter';

function HomePage() {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };
  
  const handleNavigate = (path) => {
      if (path === 'allbooks') {
          navigate('/books');
      } else {
          // React Router ke saath, humein scrolling alag tareeke se handle karni hogi
          // Abhi ke liye, hum seedhe navigate karenge
          navigate(`/#${path}`);
          setTimeout(() => {
            const section = document.getElementById(path);
            if(section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
      }
  };

  return (
    <>
      <Hero navigateTo={handleNavigate} />
      <div id="categories-section">
        <Categories onCategorySelect={handleCategorySelect} />
      </div>
      <FeaturedBooks />
      <div id="about-section">
        <AboutUs />
      </div>
      <Newsletter />
    </>
  );
}

export default HomePage;