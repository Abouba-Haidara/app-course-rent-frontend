// src/components/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const checkUser = async () => {
      const user = localStorage.getItem('access_token');
      if(user) {
      try {
        const response = await api.get('/users/'+ user?.id);
        setUser(response.data);
      } catch (error) {
        setUser(null);
        localStorage.removeItem('access_token');
      } finally {
        setLoading(false);
      }
     }
    };

    checkUser();
  }, []);

  // Fonction de connexion
  const login = async (username, password) => {
    try {
      const response = await api.post('/users/login', { username, password });
      const user = response.data;
      localStorage.setItem('access_token', user);
      const userResponse = await api.get('/users/'+user?.id);
      setUser(userResponse.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erreur lors de la connexion.' };
    }
  };

  // Fonction d'inscription
  const register = async (name, email, password, password_confirmation) => {
    try {
      const response = await api.post('/users/register', { name, email, password, password_confirmation });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erreur lors de l\'inscription.' };
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('access_token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
