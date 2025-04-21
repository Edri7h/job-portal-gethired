import React from 'react';

const NoJobOpenings = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
     

      <div className="bg-transparent backdrop-blur-md rounded-lg border border-white/40  p-16 flex flex-col items-center justify-center">
        <div className="mb-4 text-gray-400">
          <svg 
            className="w-12 h-12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
        
        <p className="text-gray-700 font-medium text-lg mb-2">No jobs found</p>
        
        <p className="text-sm text-blue-600">
          Stay tuned — new items will appear here as soon as they are available!
        </p>
      </div>
    </div>
  );
};

export default NoJobOpenings;