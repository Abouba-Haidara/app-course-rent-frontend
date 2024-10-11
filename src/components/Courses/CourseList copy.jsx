import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CourseList = ({ isAdmin = false, onUpdateStatus, onDelete }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllCourses();
    } else {
      fetchUserCourses();
    }
  }, [isAdmin]);

  const fetchAllCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des courses:', error);
    }
  };

  const fetchUserCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des courses:', error);
    }
  };

  const handleUpdateStatus = (id, newStatut) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, newStatut);
    }

    // Mise à jour du statut localement
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === id ? { ...course, statut: newStatut } : course
      )
    );
  };

  const handleDelete = async (id) => {
    if (onDelete) {
      await onDelete(id); // Attendre que la suppression soit terminée
      // Recharger les cours après la suppression
      if (isAdmin) {
        fetchAllCourses();
      } else {
        fetchUserCourses();
      }
    }
  };

  return (
    <div className="container mt-2">
      <h3 className="mb-4">{isAdmin ? 'Toutes les Courses' : 'Mes Courses'}</h3>
      {courses.length === 0 ? (
        <div className="alert alert-info">Aucune course trouvée.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Départ</th>
                <th>Arrivée</th>
                <th>Statut</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.adresse_depart}</td>
                  <td>{course.adresse_arrivee}</td>
                  <td>{course.statut}</td>
                  {isAdmin && (
                    <td className="d-flex">
                      <select 
                        className="form-select"
                        value={course.statut} 
                        onChange={(e) => handleUpdateStatus(course.id, e.target.value)}
                      >
                        <option value="en attente">En Attente</option>
                        <option value="en cours">En Cours</option>
                        <option value="terminee">Terminée</option>
                      </select>
                      <button 
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(course.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseList;
