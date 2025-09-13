import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnimals } from '../contexts/AnimalContext';
import { 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Activity,
  Calendar,
  Phone,
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const HealthManagement = () => {
  const { t } = useTranslation();
  const { animals } = useAnimals();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animal.animalId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'normal') return matchesSearch && animal.health?.status === 'Normal';
    if (filterStatus === 'diseased') return matchesSearch && animal.health?.status === 'Diseased';
    if (filterStatus === 'alerts') return matchesSearch && animal.health?.healthAlerts?.length > 0;
    
    return matchesSearch;
  });

  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'Normal':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
      case 'Diseased':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: AlertTriangle };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: Activity };
    }
  };

  const getVaccinationStatus = (animal) => {
    const vaccinations = animal.health?.vaccinationSchedule || [];
    const today = new Date();
    
    const overdue = vaccinations.filter(v => new Date(v.nextDue) < today).length;
    const dueSoon = vaccinations.filter(v => {
      const nextDue = new Date(v.nextDue);
      const daysUntil = Math.ceil((nextDue - today) / (1000 * 60 * 60 * 24));
      return daysUntil <= 30 && daysUntil > 0;
    }).length;
    
    if (overdue > 0) return { status: 'overdue', count: overdue, color: 'text-red-600', bg: 'bg-red-100' };
    if (dueSoon > 0) return { status: 'due', count: dueSoon, color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'up-to-date', count: 0, color: 'text-green-600', bg: 'bg-green-100' };
  };

  const getCommonDiseases = () => {
    return [
      {
        name: 'Foot and Mouth Disease (FMD)',
        symptoms: ['Fever', 'Blisters in mouth', 'Lameness', 'Loss of appetite'],
        prevention: ['Regular vaccination', 'Quarantine new animals', 'Clean environment'],
        treatment: 'Supportive care, antibiotics for secondary infections'
      },
      {
        name: 'Mastitis',
        symptoms: ['Swollen udder', 'Abnormal milk', 'Fever', 'Loss of appetite'],
        prevention: ['Clean milking practices', 'Proper udder hygiene', 'Regular health checks'],
        treatment: 'Antibiotics, anti-inflammatory drugs, proper milking'
      },
      {
        name: 'Brucellosis',
        symptoms: ['Abortion', 'Retained placenta', 'Infertility', 'Joint swelling'],
        prevention: ['Vaccination', 'Test and cull infected animals', 'Biosecurity measures'],
        treatment: 'No effective treatment, prevention through vaccination'
      },
      {
        name: 'Anthrax',
        symptoms: ['Sudden death', 'High fever', 'Difficulty breathing', 'Bloody discharge'],
        prevention: ['Annual vaccination', 'Proper disposal of carcasses', 'Avoid contaminated areas'],
        treatment: 'Early antibiotic treatment, supportive care'
      }
    ];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('health.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor animal health and manage preventive care
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
              <option value="normal">Healthy</option>
              <option value="diseased">Diseased</option>
              <option value="alerts">Health Alerts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Healthy Animals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {animals.filter(a => a.health?.status === 'Normal').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Diseased Animals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {animals.filter(a => a.health?.status === 'Diseased').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
              <Shield className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vaccinations Due</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {animals.reduce((count, animal) => {
                  const vaccinations = animal.health?.vaccinationSchedule || [];
                  const today = new Date();
                  return count + vaccinations.filter(v => new Date(v.nextDue) <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)).length;
                }, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Health Alerts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {animals.reduce((count, animal) => count + (animal.health?.healthAlerts?.length || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animal Health Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnimals.map((animal) => {
          const healthStatus = getHealthStatusColor(animal.health?.status);
          const vaccinationStatus = getVaccinationStatus(animal);
          const StatusIcon = healthStatus.icon;
          
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
                
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${healthStatus.bg} ${healthStatus.color} flex items-center space-x-1`}>
                  <StatusIcon className="h-4 w-4" />
                  <span>{animal.health?.status}</span>
                </div>
              </div>

              {/* Health Information */}
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Diagnosis</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {animal.health?.diagnosis || 'No diagnosis'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Treatment</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {animal.health?.treatment || 'None required'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Quarantine Status</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {animal.health?.quarantineStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Veterinary Contact</p>
                    <p className="font-medium text-gray-900 dark:text-white text-xs">
                      {animal.health?.veterinaryContact?.split(' - ')[0] || 'Not assigned'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vaccination Status */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Vaccination Status
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${vaccinationStatus.bg} ${vaccinationStatus.color}`}>
                    {vaccinationStatus.status === 'overdue' && `${vaccinationStatus.count} Overdue`}
                    {vaccinationStatus.status === 'due' && `${vaccinationStatus.count} Due Soon`}
                    {vaccinationStatus.status === 'up-to-date' && 'Up to Date'}
                  </div>
                </div>
              </div>

              {/* Health Alerts */}
              {animal.health?.healthAlerts?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Health Alerts
                  </h4>
                  <div className="space-y-2">
                    {animal.health.healthAlerts.map((alert, index) => (
                      <div key={index} className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          <span className="text-sm text-yellow-800 dark:text-yellow-200">
                            {alert.message}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preventive Measures */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Preventive Measures
                </h4>
                <ul className="space-y-1">
                  {animal.health?.preventiveMeasures?.slice(0, 3).map((measure, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{measure}</span>
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
                  onClick={() => toast.info('Health management coming soon')}
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

      {/* Common Diseases Reference */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Common Cattle Diseases & Prevention
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getCommonDiseases().map((disease, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {disease.name}
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Symptoms:</p>
                  <p className="text-gray-600 dark:text-gray-400">{disease.symptoms.join(', ')}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Prevention:</p>
                  <p className="text-gray-600 dark:text-gray-400">{disease.prevention.join(', ')}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Treatment:</p>
                  <p className="text-gray-600 dark:text-gray-400">{disease.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed View Modal */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Health Details - {selectedAnimal.animalId}
                </h2>
                <button
                  onClick={() => setSelectedAnimal(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Vaccination Schedule */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Vaccination Schedule
                  </h3>
                  <div className="space-y-2">
                    {selectedAnimal.health?.vaccinationSchedule?.map((vaccine, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {vaccine.vaccine}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Last: {new Date(vaccine.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Next Due: {new Date(vaccine.nextDue).toLocaleDateString()}
                            </p>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              new Date(vaccine.nextDue) < new Date() 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                : new Date(vaccine.nextDue) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                              {new Date(vaccine.nextDue) < new Date() ? 'Overdue' :
                               new Date(vaccine.nextDue) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'Due Soon' : 'Up to Date'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medication History */}
                {selectedAnimal.health?.medicationHistory?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Medication History
                    </h3>
                    <div className="space-y-2">
                      {selectedAnimal.health.medicationHistory.map((med, index) => (
                        <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-blue-900 dark:text-blue-100">
                                {med.medication}
                              </p>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                {med.reason}
                              </p>
                            </div>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {new Date(med.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Veterinary Contact */}
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">
                        Veterinary Contact
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        {selectedAnimal.health?.veterinaryContact}
                      </p>
                    </div>
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

export default HealthManagement;
