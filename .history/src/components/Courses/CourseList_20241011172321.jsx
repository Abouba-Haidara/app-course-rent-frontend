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

  const handleUpdateStatus = async (id, newStatut) => {
    if (onUpdateStatus) {
      const response = await api.put(`/courses/${id}/status`, {status: newStatut});
      this.setState({ updatedAt: response.data.updatedAt });
      onUpdateStatus(id, newStatut);
    }

    // Mise à jour du statut localement
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
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
    <div className="container mt-4">
      <h3 className="mb-4 text-center">{isAdmin ? 'Gestion des Courses' : 'Mes Courses'}</h3>
      {courses.length === 0 ? (
        <div className="alert alert-info text-center">Aucune course trouvée.</div>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-6 mb-4" key={course.id}>
              <div className="card shadow">
                <div className="card-header bg-dark text-white">
                  <h5 className="card-title">Course #{course.id}</h5>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Départ :</strong> {course.departureAddress}
                  </p>
                  <p>
                    <strong>Arrivée :</strong> {course.arrivalAddress}
                  </p>
                  <p>
                    <strong>Statut :</strong>{' '}
                    <span className={`badge bg-${course.status === 'en attente' ? 'warning' : course.statut === 'en cours' ? 'primary' : 'success'}`}>
                      {course.status}
                    </span>
                  </p>
                </div>
                {isAdmin && (
                  <div className="card-footer d-flex justify-content-between">
                    <select
                      className="form-select"
                      value={course.status}
                      onChange={(e) => handleUpdateStatus(course.id, e.target.value)}
                    >
                      <option value="en attente">En Attente</option>
                      <option value="en cours">En Cours</option>
                      <option value="terminee">Terminée</option>
                    </select>
                    <button className="btn btn-danger" onClick={() => handleDelete(course.id)}>
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .card {
          border-radius: 10px;
          transition: transform 0.2s ease-in-out;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
        }
        .card-footer {
          background-color: #f8f9fa;
        }
        .form-select {
          width: auto;
          margin-right: 10px;
        }
        .badge {
          font-size: 0.9rem;
        }
        .btn-danger {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        .btn-danger:hover {
          background-color: #c82333;
          border-color: #bd2130;
        }
      `}</style>
    </div>
  );
};

export default CourseList;
