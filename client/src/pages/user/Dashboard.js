import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import '../../index.css';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'DashBoard - BANTRU GBG'}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Usuario: {auth?.user?.username}</h3>
              <h3>Nombre: {auth?.user?.name}</h3>
              <h3>Correo: {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
