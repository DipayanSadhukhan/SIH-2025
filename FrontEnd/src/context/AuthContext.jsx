import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { errorToast, infoToast } from '../components/toast';

const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://sih-2025-22r8.onrender.com';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

  if (storedToken && storedUser) {
    try {
      const url = `${API_BASE_URL}/api/auth/data`;
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      });
      if (response.data.user) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } else {
        logout();
      }
    } catch (error) {
      console.log('Token verification failed during initialization:', error);
      logout();
    }
  }
    setIsLoading(false);
  };

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      const currentToken = localStorage.getItem('token');
      
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      infoToast('Logged out successfully!');
    } catch (error) {
      errorToast(error.response?.data?.message || 'Logout failed');
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);