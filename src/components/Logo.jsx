import React from 'react';

const Logo = ({ size = 'medium', showText = true, className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-20 h-20'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl',
    xlarge: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="icon-3d"
        >
          {/* Cattle/Buffalo Silhouette */}
          <path d="M24 4C24 4 20 8 20 16C20 20 22 22 24 22C26 22 28 20 28 16C28 8 24 4 24 4Z" fill="currentColor" className="text-primary-600 dark:text-primary-400"/>
          
          {/* Head */}
          <ellipse cx="24" cy="18" rx="8" ry="6" fill="currentColor" className="text-primary-600 dark:text-primary-400"/>
          
          {/* Ears */}
          <ellipse cx="18" cy="16" rx="2" ry="3" fill="currentColor" className="text-primary-700 dark:text-primary-300"/>
          <ellipse cx="30" cy="16" rx="2" ry="3" fill="currentColor" className="text-primary-700 dark:text-primary-300"/>
          
          {/* Eyes */}
          <circle cx="21" cy="17" r="1.5" fill="white"/>
          <circle cx="27" cy="17" r="1.5" fill="white"/>
          <circle cx="21" cy="17" r="0.8" fill="black"/>
          <circle cx="27" cy="17" r="0.8" fill="black"/>
          
          {/* Nose */}
          <ellipse cx="24" cy="20" rx="1.5" ry="1" fill="currentColor" className="text-primary-700 dark:text-primary-300"/>
          
          {/* Body */}
          <ellipse cx="24" cy="32" rx="10" ry="8" fill="currentColor" className="text-primary-600 dark:text-primary-400"/>
          
          {/* Legs */}
          <rect x="18" y="38" width="3" height="6" fill="currentColor" className="text-primary-700 dark:text-primary-300"/>
          <rect x="27" y="38" width="3" height="6" fill="currentColor" className="text-primary-700 dark:text-primary-300"/>
          
          {/* Tail */}
          <path d="M32 30 Q36 28 38 32" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary-700 dark:text-primary-300"/>
          
          {/* Horns (for buffalo) */}
          <path d="M20 12 Q18 8 20 6" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary-700 dark:text-primary-300"/>
          <path d="M28 12 Q30 8 28 6" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary-700 dark:text-primary-300"/>
          
          {/* Milk Drop */}
          <path d="M36 20 Q36 16 34 16 Q32 16 32 20 Q32 24 34 26 Q36 24 36 20Z" fill="currentColor" className="text-blue-500 dark:text-blue-400"/>
          <path d="M34 18 Q34 16 33 16 Q32 16 32 18 Q32 20 33 21 Q34 20 34 18Z" fill="currentColor" className="text-blue-400 dark:text-blue-300"/>
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 dark:text-white ${textSizes[size]}`}>
            CattleID
          </span>
          <span className={`text-gray-600 dark:text-gray-400 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
            Smart Farming
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
