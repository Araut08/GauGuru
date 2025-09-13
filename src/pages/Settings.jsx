import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  User, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Info,
  Save,
  Edit,
  Check,
  X
} from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    role: user?.role || 'farmer'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    vaccination: true,
    insurance: true,
    health: true
  });

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile via API
    toast.success('Profile updated successfully!');
    setIsEditingProfile(false);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success('Notification settings updated!');
  };

  const settingsSections = [
    {
      id: 'profile',
      title: t('settings.profile'),
      icon: User,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your personal information
              </p>
            </div>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="btn-outline flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>{isEditingProfile ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditingProfile}
                className="input-field disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phoneNumber}
                disabled
                className="input-field disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Phone number cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                value={profileData.role}
                onChange={(e) => setProfileData(prev => ({ ...prev, role: e.target.value }))}
                disabled={!isEditingProfile}
                className="input-field disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                <option value="farmer">Farmer</option>
                <option value="veterinarian">Veterinarian</option>
                <option value="government">Government Official</option>
              </select>
            </div>

            {isEditingProfile && (
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveProfile}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="btn-outline flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'language',
      title: t('settings.language'),
      icon: Globe,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              App Language
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Choose your preferred language for the application
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      )
    },
    {
      id: 'theme',
      title: t('settings.darkMode'),
      icon: isDarkMode ? Sun : Moon,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Appearance
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Customize the look and feel of the application
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Switch between light and dark themes
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                isDarkMode ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: t('settings.notifications'),
      icon: Bell,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Notification Preferences
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage how you receive notifications
            </p>
          </div>

          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
              { key: 'push', label: 'Push Notifications', description: 'Receive push notifications on your device' },
              { key: 'sms', label: 'SMS Notifications', description: 'Receive text message alerts' },
              { key: 'vaccination', label: 'Vaccination Reminders', description: 'Get reminded about vaccination schedules' },
              { key: 'insurance', label: 'Insurance Alerts', description: 'Receive insurance renewal reminders' },
              { key: 'health', label: 'Health Alerts', description: 'Get notified about health issues' }
            ].map((notification) => (
              <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {notification.label}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {notification.description}
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange(notification.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    notifications[notification.key] ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      notifications[notification.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Security Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage your account security and privacy
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Add an extra layer of security to your account
              </p>
              <button className="btn-outline">
                Enable 2FA
              </button>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Change Password
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Update your account password
              </p>
              <button className="btn-outline">
                Change Password
              </button>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Data Export
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Download a copy of your data
              </p>
              <button className="btn-outline">
                Export Data
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'about',
      title: t('settings.about'),
      icon: Info,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About the App
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Information about the Cattle Identification System
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Version
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                v1.0.0
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Build Date
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                January 2024
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Developer
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Smart India Hackathon Team
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Support
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                For technical support and feedback
              </p>
              <button className="btn-outline">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('settings.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your application experience
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              {section.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
