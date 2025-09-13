import React from 'react';
import { Camera } from 'lucide-react';

const ScanButton = ({ onClick, disabled = false, size = 'large' }) => {
  const sizeClasses = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  const iconSizes = {
    small: 'h-5 w-5',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        bg-primary-600 hover:bg-primary-700 
        disabled:bg-gray-400 disabled:cursor-not-allowed
        text-white font-semibold rounded-xl 
        shadow-lg hover:shadow-xl 
        transition-all duration-200 
        transform hover:scale-105 
        flex items-center justify-center space-x-3
        min-h-[60px]
      `}
    >
      <Camera className={iconSizes[size]} />
      <span className="text-lg">Scan Now</span>
    </button>
  );
};

export default ScanButton;
