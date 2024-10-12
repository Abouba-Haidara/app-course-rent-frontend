import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assurez-vous d'importer Bootstrap
import { Link } from 'react-router-dom'; // Assurez-vous d'importer Link
import bg from '../../img/bgimage.jpg'

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.username]: e.target.value 
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    const result = await register(username, email, password);
    if (result) {
      navigate('/dashboard');
    } else {
      setError(result);
    }
  };
  
  return (
    <div style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      height: '100vh', // Assurez-vous que cela couvre la hauteur totale de la page
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h3 className="mb-0">Inscription</h3>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nom</label>
                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      className="form-control" 
                      placeholder="Entrez votre nom" 
                      value={formData.username} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-control" 
                      placeholder="Entrez votre email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className="form-control" 
                      placeholder="Entrez votre mot de passe" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
                </form>
                <div className="mt-3 text-center">
                  <p>Vous avez déjà un compte? <Link to="/login" className="btn btn-link">Connectez-vous</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
