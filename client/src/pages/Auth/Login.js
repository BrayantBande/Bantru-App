import React, { useState } from 'react';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Hubo un Error al Registrarse');
    }
  };

  return (
    <Layout title={'Inicia Sesión - BANTRU APP'}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">INICIAR SESIÓN</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="InputEmail"
              placeholder="Ingresa Tu Correo Electronico"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="InputPassword"
              placeholder="Ingresa una Contraseña"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate('/forgot-password');
              }}
            >
              Olvide la Contraseña
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
