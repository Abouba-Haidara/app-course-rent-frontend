// src/components/Dashboard/UserDashboard.js

import React from 'react';
import CreateCourse from '../Courses/CreateCourse';
import CourseList from '../Courses/CourseList';
import Header from '../header/Header';

const UserDashboard = () => {
  return (
    <div className="container mt-4">
      {/* En-tête avec le titre et le bouton de déconnexion */}
      <Header title="Dashboard Utilisateur" />

      {/* Section pour créer un cours */}
      <div className="mb-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Créer un Courses</h4>
          </div>
          <div className="card-body">
            <CreateCourse />
          </div>
        </div>
      </div>

      {/* Section pour afficher la liste des cours */}
      <div>
        <div className="card shadow-sm mb-5">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Liste des Courses</h4>
          </div>
          <div className="card-body">
            <CourseList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
