import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CreateCourse = ({ onCourseCreated, title, isAdminForm = false }) => {
  const [formData, setFormData] = useState({
    departureAddress: '',
    arrivalAddress: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [positionDepart, setPositionDepart] = useState([14.692, -17.447]); // Position par défaut (Dakar)
  const [positionArrivee, setPositionArrivee] = useState([14.692, -17.447]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAdminForm ? '/courses/admin' : '/courses';
      const response = await api.post(endpoint, {
        ...formData,
        user: lo
        lat_depart: positionDepart[0],
        lng_depart: positionDepart[1],
        lat_arrivee: positionArrivee[0],
        lng_arrivee: positionArrivee[1],
      });

      setMessage(response.data.message || 'Course créée avec succès.');
      setFormData({
        departureAddress: '',
        arrivalAddress: '',
      });
      setError('');

      if (onCourseCreated) {
        onCourseCreated(response.data.course);
      }

      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la création de la course.');
      setMessage('');
    }
  };

  const MapClickHandler = ({ setPosition }) => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  // Ajouter une ligne entre le point de départ et le point d'arrivée
  const polylinePositions = [positionDepart, positionArrivee];

  return (
    <div className="container">
      <div className="card mb-4 shadow">
        <div className="card-header bg-gradient text-white text-center">
          <h4 className="mb-0">{title || 'Demander une Course'}</h4>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row">
            {/* Formulaire à gauche */}
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="form-container">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    id="departureAddress"
                    name="departureAddress"
                    className="form-control"
                    placeholder="Adresse de départ"
                    value={formData.departureAddress}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="departureAddress">Adresse de départ</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    id="arrivalAddress"
                    name="arrivalAddress"
                    className="form-control"
                    placeholder="Adresse d'arrivée"
                    value={formData.arrivalAddress}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="arrivalAddress">Adresse d'arrivée</label>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-lg btn-primary shadow-lg animate-button">
                    {isAdminForm ? 'Créer la Course Admin' : 'Demander la Course'}
                  </button>
                </div>
              </form>
            </div>

            {/* Carte à droite */}
            <div className="col-md-6">
              <div className="map-container mb-4">
                <MapContainer center={positionDepart} zoom={13} style={{ height: '200px', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {/* Marqueurs de départ et d'arrivée */}
                  <Marker position={positionDepart}></Marker>
                  <Marker position={positionArrivee}></Marker>
                  {/* Ligne entre les deux positions */}
                  <Polyline positions={polylinePositions} color="blue" />
                  <MapClickHandler setPosition={setPositionDepart} />
                  <MapClickHandler setPosition={setPositionArrivee} />
                </MapContainer>
                <p className="text-center mt-2">Cliquez sur la carte pour définir les adresses de départ et d'arrivée</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ajout de styles CSS pour améliorer l'apparence */}
      <style>{`
        .form-floating {
          margin-bottom: 20px;
        }
        .map-container {
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          overflow: hidden;
        }
        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
          transition: background-color 0.3s ease;
        }
        .btn-primary:hover {
          background-color: #0056b3;
        }
        .animate-button {
          transform: scale(1);
          transition: transform 0.2s ease;
        }
        .animate-button:hover {
          transform: scale(1.05);
        }
        .card {
          border-radius: 10px;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }
        .card-header {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          background: linear-gradient(45deg, #007bff, #6610f2);
        }
        .form-container {
          padding: 20px;
          border-radius: 10px;
          background-color: #f8f9fa;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CreateCourse;
