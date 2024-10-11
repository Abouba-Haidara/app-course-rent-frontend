import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import bg from '../../img/bgimage.jpg';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    
    const result = await login(username, password);
    console.log(result);
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
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
     }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="card shadow-lg" style={{ borderRadius: '15px' }}>
              <div className="card-header bg-primary text-white text-center" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                <h3 className="mb-0">Connexion</h3>
              </div>
              <div className="card-body p-4">
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Adresse </label>
                    <input 
                      type="text" 
                      id="username"
                      name="username" 
                      className="form-control" 
                      placeholder="Entrez votre username" 
                      value={formData.username} 
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
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    Se connecter
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <p>Pas encore de compte ? <Link to="/register" className="btn btn-link">Inscrivez-vous</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #004085;
        }
        .form-control {
          border-radius: 10px;
          padding: 10px;
        }
        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
        }
        .card {
          border-radius: 15px;
          transition: box-shadow 0.3s ease;
        }
        .card:hover {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .alert {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Login;
