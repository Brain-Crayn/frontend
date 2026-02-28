import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = authService.getUser();
    const storedTokens = authService.getTokens();
    if (storedUser && storedTokens) {
      setUser(storedUser);
      setTokens(storedTokens);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setError(null);
    setLoading(true);
    try {
      const userData = await authService.login(username, password);
      const storedTokens = authService.getTokens();
      setUser(userData);
      setTokens(storedTokens);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (idToken) => {
    setError(null);
    setLoading(true);
    try {
      const userData = await authService.googleLogin(idToken);
      const storedTokens = authService.getTokens();
      setUser(userData);
      setTokens(storedTokens);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setError(null);
    setLoading(true);
    try {
      const userData = await authService.register(username, email, password);
      const storedTokens = authService.getTokens();
      setUser(userData);
      setTokens(storedTokens);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setTokens(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const requestRoleElevation = async (requestedRole, justification) => {
    setError(null);
    try {
      const result = await authService.requestRoleElevation(requestedRole, justification);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      setUser(null);
      setTokens(null);
    }
  };

  const value = {
    user,
    tokens,
    loading,
    error,
    isAuthenticated: !!user && !!tokens,
    login,
    googleLogin,
    register,
    logout,
    requestRoleElevation,
    refreshUser,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
