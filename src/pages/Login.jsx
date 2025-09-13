import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Smartphone, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Login = () => {
  const { t } = useTranslation();
  const { sendOTP, verifyOTP, loading, otpSent, resetOTP } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!phoneNumber) {
      setErrors({ phoneNumber: 'Phone number is required' });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setErrors({ phoneNumber: 'Please enter a valid 10-digit Indian phone number' });
      return;
    }

    await sendOTP(phoneNumber);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }

    if (otp.length !== 6) {
      setErrors({ otp: 'OTP must be 6 digits' });
      return;
    }

    await verifyOTP(phoneNumber, otp);
  };

  const handleBackToPhone = () => {
    setOtp('');
    resetOTP();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <Eye className="h-5 w-5 text-yellow-500" />
        ) : (
          <EyeOff className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Language Switcher */}
      <div className="absolute top-4 left-4">
        <LanguageSwitcher />
      </div>

      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="xlarge" showText={true} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('auth.welcome')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('auth.subtitle')}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {!otpSent ? (
            // Phone Number Form
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('auth.phoneNumber')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9876543210"
                    className={`input-field pl-10 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                    maxLength="10"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phoneNumber}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>{t('auth.sendOtp')}</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            // OTP Verification Form
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('auth.verifyOtp')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  OTP sent to +91 {phoneNumber}
                </p>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('auth.otp')}
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className={`input-field text-center text-2xl tracking-widest ${errors.otp ? 'border-red-500 focus:ring-red-500' : ''}`}
                  maxLength="6"
                />
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.otp}</p>
                )}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>{t('auth.verifyOtp')}</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBackToPhone}
                  className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  Change phone number
                </button>
              </div>
            </form>
          )}

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
              <strong>Demo:</strong> Use any 10-digit phone number and OTP: <strong>123456</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
