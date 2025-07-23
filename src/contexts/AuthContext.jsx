import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  const login = (userData) => {
    const defaultUser = {
      profilePicture: `https://api.dicebear.com/7.x/adventurer/svg?seed=${userData.email}`,
      points: userData.points || 0
    };
    const fullUserData = { ...defaultUser, ...userData };
    setUser(fullUserData);
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData) => {
    const referralCode = `ref-${Date.now()}`;
    const newUser = {
      ...userData,
      id: Date.now(),
      role: 'student',
      createdAt: new Date().toISOString(),
      profilePicture: `https://api.dicebear.com/7.x/adventurer/svg?seed=${userData.email}`,
      points: 0,
      referralCode: referralCode,
    };
    setUser(newUser);
    return newUser;
  };

  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      updateUser,
      isLoading,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};