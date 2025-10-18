import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { errorToast, infoToast } from '../components/toast';

const AuthContext = createContext();
const murl = "https://sih-2025-server-y4pi.onrender.com"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setToken(token);
      setUser(JSON.parse(userData));
    }
  }, []);

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
        `${murl}/api/auth/logout`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json'
          }
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
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);