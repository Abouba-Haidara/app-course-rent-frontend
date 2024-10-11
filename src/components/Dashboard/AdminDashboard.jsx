// src/components/Dashboard/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import CourseList from '../Courses/CourseList';
import api from '../services/api';
import Header from '../header/Header';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des courses:', error);
    }
  };

  const updateCourseStatus = async (id, statut) => {
    try {
      await api.put(`/courses/${id}`, { statut });
      fetchAllCourses();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      fetchAllCourses();
    } catch (error) {
      console.error('Erreur lors de la suppression de la course:', error);
    }
  };

  return (
    <div className="container mt-4">
      {/* En-tête avec le titre et le bouton de déconnexion */}
      <Header title="Dashboard Admin" />
      {/* Section pour afficher la liste des cours */}
      {courses.length === 0 ? (
        <p>Aucune course trouvée.</p>
      ) : (
        <CourseList 
          courses={courses} 
          isAdmin={true} 
          onUpdateStatus={updateCourseStatus} 
          onDelete={deleteCourse} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
