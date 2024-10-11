import React, { useState } from 'react';
import api from '../services/api';

const CreateCourse = ({ onCourseCreated, title, isAdminForm = false }) => {
  const [formData, setFormData] = useState({
    adresse_depart: '',
    adresse_arrivee: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAdminForm ? '/courses/admin' : '/courses';
      const response = await api.post(endpoint, formData);
      
      setMessage(response.data.message || 'Course créée avec succès.');
      setFormData({
        adresse_depart: '',
        adresse_arrivee: '',
      });
      setError('');

      // Appeler la fonction de rappel pour ajouter la course à la liste
      if (onCourseCreated) {
        onCourseCreated(response.data.course);
      }

      // Rafraîchir la page
      window.location.reload();

    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la création de la course.');
      setMessage('');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4 className="mb-0">{title || 'Demander une Course'}</h4>
      </div>
      <div className="card-body">
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="adresse_depart" className="form-label">Adresse de départ</label>
            <input 
              type="text" 
              id="adresse_depart"
              name="adresse_depart" 
              className="form-control" 
              placeholder="Adresse de départ" 
              value={formData.adresse_depart} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adresse_arrivee" className="form-label">Adresse d'arrivée</label>
            <input 
              type="text" 
              id="adresse_arrivee"
              name="adresse_arrivee" 
              className="form-control" 
              placeholder="Adresse d'arrivée" 
              value={formData.adresse_arrivee} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isAdminForm ? 'Créer la Course Admin' : 'Demander la Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
