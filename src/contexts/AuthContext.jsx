import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('cattleApp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const sendOTP = async (phoneNumber) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock OTP sending
      console.log(`OTP sent to ${phoneNumber}: 123456`);
      setOtpSent(true);
      toast.success('OTP sent successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to send OTP');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (phoneNumber, otp) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock OTP verification (accept 123456 or any 6-digit code)
      if (otp === '123456' || otp.length === 6) {
        const userData = {
          id: Date.now().toString(),
          phoneNumber,
          name: `Farmer ${phoneNumber.slice(-4)}`,
          role: 'farmer',
          createdAt: new Date().toISOString()
        };
        
        setUser(userData);
        setOtpVerified(true);
        localStorage.setItem('cattleApp_user', JSON.stringify(userData));
        toast.success('Login successful!');
        return { success: true, user: userData };
      } else {
        toast.error('Invalid OTP');
        return { success: false, error: 'Invalid OTP' };
      }
    } catch (error) {
      toast.error('OTP verification failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setOtpSent(false);
    setOtpVerified(false);
    localStorage.removeItem('cattleApp_user');
    toast.success('Logged out successfully');
  };

  const resetOTP = () => {
    setOtpSent(false);
    setOtpVerified(false);
  };

  const value = {
    user,
    loading,
    otpSent,
    otpVerified,
    sendOTP,
    verifyOTP,
    logout,
    resetOTP,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
