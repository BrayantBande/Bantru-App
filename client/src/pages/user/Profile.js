import React, { useState, useEffect } from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  //get user
  useEffect(() => {
    const { email, name, username, phone, password } = auth?.user;
    setUsername(username);
    setName(name);
    setEmail(email);
    setPassword(password);
    setPhone(phone);
  }, [auth?.user]);

  //Formulario Funcion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('/api/v1/auth/profile', {
        username,
        name,
        email,
        password,
        phone,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('Perfil Actualizado Exitosamente');
      }
    } catch (error) {
      console.log(error);
      toast.error('Hubo un Error al Registrarse');
    }
  };

  return (
    <Layout title={'Tu Perfil - BANTRU GBG'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">PERFIL DE USUARIO</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    id="InputUsername"
                    placeholder="Ingresa un Usuario"
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
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="InputPassword"
                    placeholder="Ingresa una Contraseña"
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
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Actualizar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
