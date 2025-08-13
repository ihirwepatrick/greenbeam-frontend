'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthResponse } from '../lib/types/api';
import { authService } from '../lib/services/api';
import apiClient from '../lib/api-client';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = apiClient.getToken();
        if (token) {
          await refreshUser();
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        apiClient.setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });
      
      if (response.success) {
        const { user: userData, token, refreshToken } = response.data;
        
        // Store tokens
        apiClient.setToken(token);
        localStorage.setItem('refresh_token', refreshToken);
        
        // Set user
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.register({ email, password, name });
      
      if (response.success) {
        const { user: userData, token, refreshToken } = response.data;
        
        // Store tokens
        apiClient.setToken(token);
        localStorage.setItem('refresh_token', refreshToken);
        
        // Set user
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Call logout API
      await authService.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local state regardless of API call success
      apiClient.setToken(null);
      localStorage.removeItem('refresh_token');
      setUser(null);
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const response = await authService.getProfile();
      if (response.success) {
        setUser(response.data);
      } else {
        throw new Error('Failed to get user profile');
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, clear auth state
      apiClient.setToken(null);
      localStorage.removeItem('refresh_token');
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 