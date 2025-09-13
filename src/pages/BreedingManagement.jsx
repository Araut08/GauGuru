import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnimals } from '../contexts/AnimalContext';
import { 
  Heart, 
  Calendar, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const BreedingManagement = () => {
  const { t } = useTranslation();
  const { animals } = useAnimals();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.animalId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'pregnant') return matchesSearch && animal.breeding?.pregnancyStatus?.includes('Pregnant');
    if (filterStatus === 'ready') return matchesSearch && animal.breeding?.pregnancyStatus === 'Not Pregnant';
    if (filterStatus === 'due') {
      const nextMating = new Date(animal.breeding?.nextMatingDue);
      const today = new Date();
      const daysUntil = Math.ceil((nextMating - today) / (1000 * 60 * 60 * 24));
      return matchesSearch && daysUntil <= 30;
    }
    
    return matchesSearch;
  });

  const getBreedingStatus = (animal) => {
    if (animal.breeding?.pregnancyStatus?.includes('Pregnant')) {
      return { status: 'pregnant', color: 'text-green-600', bg: 'bg-green-100' };
    }
    
    const nextMating = new Date(animal.breeding?.nextMatingDue);
    const today = new Date();
    const daysUntil = Math.ceil((nextMating - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 0) {
      return { status: 'overdue', color: 'text-red-600', bg: 'bg-red-100' };
    } else if (daysUntil <= 30) {
      return { status: 'due', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    } else {
      return { status: 'ready', color: 'text-blue-600', bg: 'bg-blue-100' };
    }
  };

  const getBreedingRecommendations = (animal) => {
    const recommendations = [];
    
    if (animal.breeding?.pregnancyStatus?.includes('Pregnant')) {
      recommendations.push('Provide extra nutrition for pregnancy');
      recommendations.push('Schedule regular veterinary checkups');
      recommendations.push('Prepare clean and comfortable calving area');
    } else {
      const nextMating = new Date(animal.breeding?.nextMatingDue);
      const today = new Date();
      const daysUntil = Math.ceil((nextMating - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntil <= 30) {
        recommendations.push('Schedule mating with recommended partner');
        recommendations.push('Ensure animal is in good health condition');
        recommendations.push('Prepare breeding environment');
      } else {
        recommendations.push('Monitor heat cycles regularly');
        recommendations.push('Maintain optimal body condition');
        recommendations.push('Keep breeding records updated');
      }
    }
    
    return recommendations;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('breeding.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage breeding schedules and pregnancy tracking
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search animals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Animals</option>
              <option value="pregnant">Pregnant</option>
              <option value="ready">Ready for Mating</option>
              <option value="due">Mating Due Soon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Breeding Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pregnant</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {animals.filter(a => a.breeding?.pregnancyStatus?.includes('Pregnant')).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ready for Mating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {animals.filter(a => a.breeding?.pregnancyStatus === 'Not Pregnant').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mating Due Soon</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {animals.filter(a => {
                  const nextMating = new Date(a.breeding?.nextMatingDue);
                  const today = new Date();
                  const daysUntil = Math.ceil((nextMating - today) / (1000 * 60 * 60 * 24));
                  return daysUntil <= 30;
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Animals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{animals.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animal Breeding Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnimals.map((animal) => {
          const breedingStatus = getBreedingStatus(animal);
          const recommendations = getBreedingRecommendations(animal);
          
          return (
            <div key={animal.id} className="card hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      {animal.breed.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {animal.breed}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {animal.animalId}
                    </p>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${breedingStatus.bg} ${breedingStatus.color}`}>
                  {breedingStatus.status.charAt(0).toUpperCase() + breedingStatus.status.slice(1)}
                </div>
              </div>

              {/* Breeding Information */}
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Optimal Mating Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {animal.breeding?.optimalMatingTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Breeding Shelf Life</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {animal.breeding?.breedingShelfLife}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Pregnancy Status</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {animal.breeding?.pregnancyStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Fertility Status</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {animal.breeding?.fertilityStatus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommended Partner */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Recommended Partner</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {animal.breeding?.recommendedPartner}
                </p>
              </div>

              {/* Next Mating Date */}
              {animal.breeding?.nextMatingDue && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Next Mating Due: {new Date(animal.breeding.nextMatingDue).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Recommendations
                </h4>
                <ul className="space-y-1">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedAnimal(animal)}
                  className="flex-1 btn-outline flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => toast.info('Breeding management coming soon')}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Update</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed View Modal */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Breeding Details - {selectedAnimal.animalId}
                </h2>
                <button
                  onClick={() => setSelectedAnimal(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Breeding History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Breeding History
                  </h3>
                  <div className="space-y-2">
                    {selectedAnimal.breeding?.breedingHistory?.map((record, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {record.partner}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(record.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === 'Successful' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Health & Care Recommendations
                  </h3>
                  <div className="space-y-2">
                    {selectedAnimal.health?.preventiveMeasures?.map((measure, index) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-900 dark:text-blue-100">{measure}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedingManagement;
