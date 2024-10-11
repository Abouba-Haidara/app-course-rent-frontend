// src/services/api.js

import axios from 'axios';

// Créer une instance d'Axios avec les configurations de base
const api = axios.create({
  baseURL: 'https://course-vert.vercel.app/api/', // Remplace par l'URL de ton backend Laravel
  //baseURL: 'http://localhost:8000/api', // Remplace par l'URL de ton backend Laravel
});

// Ajouter un intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Utilise un stockage sécurisé si possible
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
