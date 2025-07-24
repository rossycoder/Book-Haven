// src/components/FlashMessage.jsx
import React, { useState, useEffect } from 'react';

function FlashMessage({ message, type = 'success', duration = 3000, onHide }) {
  const [isVisible, setIsVisible] = useState(false);

  // Define styles based on the message type
  const baseClasses = "fixed top-5 right-5 max-w-sm rounded-lg shadow-2xl p-4 flex items-center z-[100] transition-all duration-500";
  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  // Set visibility and timer when the component mounts or message changes
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Allow time for fade-out animation before calling onHide
        setTimeout(onHide, 500); 
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onHide]);

  if (!message) return null;

  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      {/* Icon for success */}
      {type === 'success' && (
        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      <span>{message}</span>
    </div>
  );
}

export default FlashMessage;
