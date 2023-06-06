import React, { useState } from 'react';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/AuthStyles.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  //Formulario Funcion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register', {
        username,
        name,
        email,
        password,
        phone,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
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
    <Layout title={'Registrar - BANTRU APP'}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTRATE</h4>
          <div className="mb-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              id="InputUsername"
              placeholder="Ingresa un Usuario"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="InputName"
              placeholder="Ingresa Tu Nombre y Apellido"
              required
            />
          </div>
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
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="InputPhone"
              placeholder="Ingresa tú número de telefono"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="InputAddress"
              placeholder="Nombre de tu artista favorito"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarme
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
