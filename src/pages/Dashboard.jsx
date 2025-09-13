import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAnimals } from '../contexts/AnimalContext';
import { 
  Camera, 
  Upload, 
  Plus, 
  Database, 
  BarChart3, 
  Bell,
  Users,
  TrendingUp,
  Activity,
  Heart,
  Shield
} from 'lucide-react';
import ScanButton from '../components/ScanButton';
import AnimalCard from '../components/AnimalCard';
import Alerts from '../components/Alerts';
import Logo from '../components/Logo';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { animals, getMilkYieldStats } = useAnimals();

  const stats = getMilkYieldStats();
  const recentAnimals = animals.slice(0, 3);

  const quickActions = [
    {
      name: t('dashboard.scanNow'),
      description: 'Iris scan for identification',
      icon: Camera,
      color: 'bg-primary-500',
      hoverColor: 'hover:bg-primary-600',
      onClick: () => navigate('/scan')
    },
    {
      name: t('dashboard.uploadPhoto'),
      description: 'Upload animal photo',
      icon: Upload,
      color: 'bg-secondary-500',
      hoverColor: 'hover:bg-secondary-600',
      onClick: () => navigate('/scan')
    },
    {
      name: t('dashboard.addNewAnimal'),
      description: 'Add new animal record',
      icon: Plus,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      onClick: () => navigate('/records')
    },
    {
      name: t('dashboard.viewRecords'),
      description: 'View all animals',
      icon: Database,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      onClick: () => navigate('/records')
    }
  ];

  const statsCards = [
    {
      name: t('milk.totalAnimals'),
      value: stats.totalAnimals,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      name: t('milk.averageYield'),
      value: `${stats.averageYield}L`,
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      name: t('milk.dailyYield'),
      value: `${stats.totalYield}L`,
      icon: Activity,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t('dashboard.welcome')}, {user?.name || 'Farmer'}!
            </h1>
            <p className="text-primary-100">
              {t('app.subtitle')}
            </p>
          </div>
          <div className="hidden md:block">
            <Logo size="large" showText={false} className="text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card-farmer text-center">
              <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${stat.bgColor}`}>
                <Icon className={`h-10 w-10 ${stat.color} icon-3d-large`} />
              </div>
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                {stat.name}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
        <div className="card-farmer">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            {t('dashboard.quickActions')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`p-8 rounded-2xl text-white transition-all duration-200 transform hover:scale-105 ${action.color} ${action.hoverColor} shadow-xl hover:shadow-2xl`}
                >
                  <Icon className="h-12 w-12 mb-4 icon-3d-large" />
                  <h3 className="font-bold text-xl mb-2">{action.name}</h3>
                  <p className="text-base opacity-90">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Animals */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Animals
            </h2>
            <button
              onClick={() => navigate('/records')}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              View All
            </button>
          </div>
          
          {recentAnimals.length > 0 ? (
            <div className="space-y-4">
              {recentAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} compact />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No animals registered yet
              </p>
              <button
                onClick={() => navigate('/scan')}
                className="btn-primary"
              >
                Add Your First Animal
              </button>
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('dashboard.alerts')}
            </h2>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>
          <Alerts />
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Milk Dashboard */}
        <div className="card-farmer bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400 icon-3d-large" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('milk.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track milk production and health metrics
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/milk')}
              className="btn-farmer-primary flex items-center space-x-2"
            >
              <BarChart3 className="h-6 w-6" />
              <span>View</span>
            </button>
          </div>
        </div>

        {/* Breeding Management */}
        <div className="card-farmer bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400 icon-3d-large" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('breeding.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage breeding schedules and pregnancy tracking
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/breeding')}
              className="btn-farmer-primary flex items-center space-x-2"
            >
              <Heart className="h-6 w-6" />
              <span>View</span>
            </button>
          </div>
        </div>

        {/* Health Management */}
        <div className="card-farmer bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-600 dark:text-red-400 icon-3d-large" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('health.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor health and preventive care
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/health')}
              className="btn-farmer-primary flex items-center space-x-2"
            >
              <Shield className="h-6 w-6" />
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
