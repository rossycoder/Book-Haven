import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  const { _id, title, author, coverImg, price } = book;
  const imageUrl = coverImg ? `http://localhost:5000/${coverImg.replace(/\\/g, '/')}` : `https://placehold.co/256x384/e0e0e0/7f7f7f?text=No+Image`;

  return (
    <Link to={`/books/${_id}`} className="group [perspective:1000px]">
      <div className="relative h-96 w-64 rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(15deg)]">
        <div className="absolute inset-0">
          <img 
            className="h-full w-full rounded-xl object-cover shadow-xl" 
            src={imageUrl} 
            alt={`${title} cover`} 
            onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/256x384/e0e0e0/7f7f7f?text=Invalid+Image`; }}
          />
        </div>
        <div className="absolute left-0 top-0 h-full w-8 bg-indigo-900 [transform:rotateY(-90deg)_translateX(-1rem)] origin-left flex items-center justify-center">
            <span className="text-white text-xs font-bold [writing-mode:vertical-lr] transform rotate-180">{title}</span>
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/60 px-12 text-center text-slate-200 [transform:rotateY(15deg)_translateZ(1px)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
          <h3 className="font-bold text-2xl">{title}</h3>
          <p className="text-lg italic mt-2">{author}</p>
          <p className={`mt-6 text-xl font-bold ${price === 'Free' ? 'text-green-400' : 'text-yellow-400'}`}>
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;