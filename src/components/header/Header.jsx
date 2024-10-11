// src/components/Header.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = ({ title }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Appelle la fonction de déconnexion du contexte
      navigate('/login', { replace: true }); // Redirection vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="d-flex justify-content-between align-items-center py-3 border-bottom">
      <h2 className="text-primary">{title}</h2>
      <button 
        className="btn btn-danger" 
        onClick={handleLogout}
      >
        Déconnexion
      </button>
    </header>
  );
};

export default Header;
