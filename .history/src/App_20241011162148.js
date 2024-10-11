// src/App.js

import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './components/context/AuthContext';

const App = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <Routes>
      {/* Routes Publiques */}
    
      {/* Routes Protégées */}
      <Route 
        path="/dashboard" 
        element={
          user ? (
            user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      
      {/* Route par Défaut */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
