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
console.log(user)
  return (
    <Routes>
      {/* Routes Protégées */}
      <Route 
        path="/dashboard" 
        element={
          user ? (
            user.role === 'USER' ? <AdminDashboard /> : <UserDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }   
      />
       {/* Routes Publiques */}
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
