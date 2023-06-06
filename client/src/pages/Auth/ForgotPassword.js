import React, { useState } from 'react';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/AuthStyles.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/forgot-password', {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Hubo un Error al Registrarse');
    }
  };
  return (
    <Layout title={'Forgot Password - BANTRU GBG'}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">CAMBIAR CONTRASEÑA</h4>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="InputAnswer"
              placeholder="Ingresa Tu Artista Favorito"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="InputPassword"
              placeholder="Ingresa una Contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
