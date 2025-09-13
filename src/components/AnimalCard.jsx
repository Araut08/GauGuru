import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Calendar, User, Droplets } from 'lucide-react';

const AnimalCard = ({ animal, compact = false }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/records?animal=${animal.id}`);
  };

  if (compact) {
    return (
      <div 
        onClick={handleViewDetails}
        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200"
      >
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
            {animal.breed.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {animal.breed}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ID: {animal.animalId}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {animal.milkYield}L
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Daily
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        {/* Animal Image/Icon */}
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-2xl">
            {animal.breed.charAt(0)}
          </span>
        </div>

        {/* Animal Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {animal.breed}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ID: {animal.animalId}
              </p>
            </div>
            <button
              onClick={handleViewDetails}
              className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>

          {/* Animal Traits */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">{animal.age}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">{animal.owner}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">{animal.milkYield}L/day</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="text-gray-600 dark:text-gray-300">{animal.color}</span>
            </div>
          </div>

          {/* Health Status */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                animal.traits?.vaccination === 'Up to date' 
                  ? 'bg-green-500' 
                  : 'bg-yellow-500'
              }`}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {animal.traits?.vaccination || 'Vaccination status unknown'}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Updated {new Date(animal.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
