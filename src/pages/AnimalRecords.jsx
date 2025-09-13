import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAnimals } from '../contexts/AnimalContext';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Grid,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react';
import AnimalCard from '../components/AnimalCard';
import { toast } from 'react-hot-toast';

const AnimalRecords = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { animals, searchAnimals, filterAnimals, deleteAnimal } = useAnimals();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredAnimals, setFilteredAnimals] = useState(animals);

  // Get animal ID from URL params for detailed view
  const selectedAnimalId = searchParams.get('animal');

  useEffect(() => {
    let result = animals;

    // Apply search filter
    if (searchQuery) {
      result = searchAnimals(searchQuery);
    }

    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(animal => {
        if (filter === 'cattle') {
          return animal.breed.toLowerCase().includes('holstein') || 
                 animal.breed.toLowerCase().includes('jersey') ||
                 animal.breed.toLowerCase().includes('cattle');
        }
        if (filter === 'buffalo') {
          return animal.breed.toLowerCase().includes('buffalo') || 
                 animal.breed.toLowerCase().includes('murrah');
        }
        return true;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'breed':
          aValue = a.breed.toLowerCase();
          bValue = b.breed.toLowerCase();
          break;
        case 'milkYield':
          aValue = a.milkYield || 0;
          bValue = b.milkYield || 0;
          break;
        case 'age':
          aValue = parseInt(a.age) || 0;
          bValue = parseInt(b.age) || 0;
          break;
        case 'lastUpdated':
        default:
          aValue = new Date(a.lastUpdated);
          bValue = new Date(b.lastUpdated);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredAnimals(result);
  }, [animals, searchQuery, filter, sortBy, sortOrder, searchAnimals]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const handleDeleteAnimal = (animalId) => {
    if (window.confirm('Are you sure you want to delete this animal record?')) {
      deleteAnimal(animalId);
      toast.success('Animal record deleted successfully');
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Animal ID', 'Breed', 'Color', 'Age', 'Owner', 'Milk Yield (L)', 'Last Updated'],
      ...filteredAnimals.map(animal => [
        animal.animalId,
        animal.breed,
        animal.color,
        animal.age,
        animal.owner,
        animal.milkYield,
        new Date(animal.lastUpdated).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `animal-records-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully');
  };

  const selectedAnimal = selectedAnimalId ? animals.find(a => a.id === selectedAnimalId) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('records.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and view all your animal records
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={exportData}
            className="btn-outline flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={() => navigate('/scan')}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Animal</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('records.search')}
                value={searchQuery}
                onChange={handleSearch}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="flex space-x-2">
                  {['all', 'cattle', 'buffalo'].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        filter === category
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {t(`records.${category}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <div className="flex space-x-2">
                  {[
                    { key: 'lastUpdated', label: 'Last Updated' },
                    { key: 'breed', label: 'Breed' },
                    { key: 'milkYield', label: 'Milk Yield' },
                    { key: 'age', label: 'Age' }
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleSort(option.key)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        sortBy === option.key
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.key && (
                        sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredAnimals.length} of {animals.length} animals
        </p>
        
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Animal Records */}
      {filteredAnimals.length > 0 ? (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        `}>
          {filteredAnimals.map((animal) => (
            <div key={animal.id} className="relative group">
              <AnimalCard animal={animal} />
              
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex space-x-1">
                  <button
                    onClick={() => {
                      setSearchParams({ animal: animal.id });
                    }}
                    className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  
                  <button
                    onClick={() => {
                      // Navigate to edit page or open edit modal
                      toast.info('Edit functionality coming soon');
                    }}
                    className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteAnimal(animal.id)}
                    className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No animals found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchQuery 
              ? 'Try adjusting your search criteria'
              : 'Start by adding your first animal record'
            }
          </p>
          <button
            onClick={() => navigate('/scan')}
            className="btn-primary"
          >
            Add Animal
          </button>
        </div>
      )}

      {/* Animal Detail Modal */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Animal Details
                </h2>
                <button
                  onClick={() => setSearchParams({})}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <AnimalCard animal={selectedAnimal} />
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSearchParams({})}
                  className="btn-outline"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSearchParams({});
                    navigate('/scan');
                  }}
                  className="btn-primary"
                >
                  Edit Animal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalRecords;
