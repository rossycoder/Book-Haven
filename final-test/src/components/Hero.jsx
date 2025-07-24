// src/components/Hero.jsx
import React from 'react';

// Hero component ab 'navigateTo' function lega
function Hero({ navigateTo }) {
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          {/* Diagonal shape separator */}
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-50 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Discover worlds</span>{' '}
                <span className="block text-indigo-600 xl:inline">within pages</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Dive into our vast collection of books. From timeless classics to modern bestsellers, your next great adventure is just a click away.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  {/* 'Explore the Books' ab ek button hai jo 'allbooks' page par le jaayega */}
                  <button
                    onClick={() => navigateTo('allbooks')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Explore the Books
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  {/* 'Learn more' ab ek button hai jo 'about-section' tak scroll karega */}
                  <button
                    onClick={() => navigateTo('about-section')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* 3D Book Section */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center p-8">
        <div className="[perspective:2000px] group">
            <div className="relative w-72 h-[26rem] transition-transform duration-1000" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute w-full h-full rounded-r-lg cursor-pointer flex flex-col origin-left transition-transform duration-500 group-hover:[transform:rotateY(-35deg)]"
                     style={{ backfaceVisibility: 'hidden', transform: 'rotateY(-25deg)', background: 'linear-gradient(to right, #4338ca, #5a67d8)' }}>
                    <div className="w-full h-full flex flex-col justify-center items-center p-6 border-2 border-yellow-200/50 rounded-r-lg">
                        <h2 className="text-white text-3xl font-serif text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>The Book of Wonders</h2>
                        <p className="text-yellow-200 mt-4">An Adventure Awaits</p>
                        <div className="w-24 h-32 mt-8 border-2 border-yellow-300/70 flex items-center justify-center">
                           <svg className="w-16 h-16 text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="absolute w-full h-full bg-white [transform:rotateY(-25deg)_translateZ(-20px)] rounded-r-lg shadow-2xl"></div>
                <div className="absolute w-full h-full bg-gray-100 [transform:rotateY(-25deg)_translateZ(-15px)] rounded-r-lg"></div>
                <div className="absolute w-full h-full bg-white [transform:rotateY(-25deg)_translateZ(-10px)] rounded-r-lg"></div>
                <div className="absolute w-full h-full bg-gray-100 [transform:rotateY(-25deg)_translateZ(-5px)] rounded-r-lg"></div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
