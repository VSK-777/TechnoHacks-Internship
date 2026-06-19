import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getMe } from '../api/auth';
import { DEFAULT_AVATAR } from '../utils/constants';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      validateToken();
    } else {
      setLoading(false);
    }
  }, []);

  async function validateToken() {
    try {
      const userData = await getMe();
      const enrichedUser = {
        ...userData,
        avatarUrl: userData.avatarUrl || DEFAULT_AVATAR(userData.username),
      };
      setUser(enrichedUser);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  const login = useCallback(async (username, password, rememberMe = false) => {
    try {
      const data = await apiLogin(username, password);
      const enrichedUser = {
        id: data.userId,
        userId: data.userId,
        username: data.username,
        email: data.email,
        avatarUrl: data.avatarUrl || DEFAULT_AVATAR(data.username),
        token: data.token,
      };
      
      if (rememberMe) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(enrichedUser));
      } else {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(enrichedUser));
      }
      
      setUser(enrichedUser);
      setIsAuthenticated(true);
      toast.success('Successfully logged in.');
      return enrichedUser;
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data || 'Login failed';
      toast.error(typeof msg === 'string' ? msg : 'Login failed');
      throw error;
    }
  }, []);

  const register = useCallback(async (username, email, password) => {
    try {
      const data = await apiRegister(username, email, password);
      const enrichedUser = {
        id: data.userId,
        userId: data.userId,
        username: data.username,
        email: data.email,
        avatarUrl: data.avatarUrl || DEFAULT_AVATAR(data.username),
        token: data.token,
      };
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(enrichedUser));
      setUser(enrichedUser);
      setIsAuthenticated(true);
      toast.success('Successfully registered.');
      return enrichedUser;
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data || 'Registration failed';
      toast.error(typeof msg === 'string' ? msg : 'Registration failed');
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch (error) {
      // Silent fail on logout API
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
