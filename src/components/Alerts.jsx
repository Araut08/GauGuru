import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Shield, Heart, Clock } from 'lucide-react';

const Alerts = () => {
  const { t } = useTranslation();

  // Mock alerts data
  const alerts = [
    {
      id: 1,
      type: 'vaccination',
      title: t('milk.vaccinationReminder'),
      message: 'CT001 needs vaccination in 2 weeks',
      priority: 'high',
      date: '2024-01-15',
      icon: Shield,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      id: 2,
      type: 'insurance',
      title: t('milk.insuranceReminder'),
      message: 'BF002 insurance expires in 1 month',
      priority: 'medium',
      date: '2024-01-20',
      icon: AlertTriangle,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      id: 3,
      type: 'health',
      title: t('milk.healthAlerts'),
      message: 'CT001 milk yield decreased by 15%',
      priority: 'medium',
      date: '2024-01-18',
      icon: Heart,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8">
        <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">
          No alerts at the moment
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const Icon = alert.icon;
        return (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-l-4 ${
              alert.priority === 'high' 
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                : alert.priority === 'medium'
                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${alert.bgColor}`}>
                <Icon className={`h-4 w-4 ${alert.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {alert.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {alert.message}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(alert.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Alerts;
