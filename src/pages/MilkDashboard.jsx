import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnimals } from '../contexts/AnimalContext';
import { 
  Droplets,
  Calendar,
  AlertTriangle,
  Shield,
  Heart,
  Clock,
  Download,
  Filter,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react';
import Alerts from '../components/Alerts';

const MilkDashboard = () => {
  const { t } = useTranslation();
  const { animals, getMilkYieldStats } = useAnimals();

  const stats = getMilkYieldStats();

  // Simple daily milk data for last 7 days
  const dailyMilkData = [
    { day: 'Monday', milk: 45 },
    { day: 'Tuesday', milk: 52 },
    { day: 'Wednesday', milk: 48 },
    { day: 'Thursday', milk: 55 },
    { day: 'Friday', milk: 50 },
    { day: 'Saturday', milk: 47 },
    { day: 'Sunday', milk: 43 }
  ];

  const topAnimals = animals
    .sort((a, b) => (b.milkYield || 0) - (a.milkYield || 0))
    .slice(0, 5);

  const exportData = () => {
    const csvContent = [
      ['Animal ID', 'Breed', 'Daily Milk (L)', 'Status'],
      ...animals.map(animal => [
        animal.animalId,
        animal.breed,
        animal.milkYield || 0,
        animal.health?.status || 'Normal'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `milk-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('milk.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('milk.subtitle')}
          </p>
        </div>
        
        <button
          onClick={exportData}
          className="btn-outline flex items-center space-x-2"
        >
          <Download className="h-5 w-5" />
          <span>{t('common.export')}</span>
        </button>
      </div>

      {/* Simple Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-farmer text-center">
          <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
            <Droplets className="h-10 w-10 text-blue-600 dark:text-blue-400 icon-3d-large" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {stats.totalYield}L
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('milk.totalDailyYield')}
          </p>
        </div>

        <div className="card-farmer text-center">
          <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <Users className="h-10 w-10 text-green-600 dark:text-green-400 icon-3d-large" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {stats.totalAnimals}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('milk.totalAnimals')}
          </p>
        </div>

        <div className="card-farmer text-center">
          <div className="mx-auto w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
            <TrendingUp className="h-10 w-10 text-purple-600 dark:text-purple-400 icon-3d-large" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {stats.averageYield}L
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('milk.averageYield')}
          </p>
        </div>

        <div className="card-farmer text-center">
          <div className="mx-auto w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6">
            <Activity className="h-10 w-10 text-orange-600 dark:text-orange-400 icon-3d-large" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {animals.filter(a => a.health?.status === 'Normal').length}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('health.healthyAnimals')}
          </p>
        </div>
      </div>

      {/* Simple Weekly Milk Chart */}
      <div className="card-farmer">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          {t('milk.weeklyMilkProduction')}
        </h3>
        <div className="space-y-6">
          {dailyMilkData.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center space-x-4">
                <Calendar className="h-6 w-6 text-gray-500 icon-3d" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {day.day}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="progress-bar w-40">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(day.milk / 60) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white min-w-[4rem]">
                  {day.milk}L
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Milk Producers */}
      <div className="card-farmer">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          {t('milk.topMilkProducers')}
        </h3>
        <div className="space-y-6">
          {topAnimals.map((animal, index) => (
            <div key={animal.id} className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 font-bold text-2xl">
                    {animal.breed.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {animal.animalId}
                  </p>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    {animal.breed}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {animal.milkYield}L
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  {t('milk.perDay')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Alerts */}
      <div className="card-farmer">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          {t('health.healthAlerts')}
        </h3>
        <Alerts />
      </div>
    </div>
  );
};

export default MilkDashboard;
