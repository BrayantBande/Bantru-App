import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
import '../../styles/CardStyles.css';
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    'No Procesada',
    'Procesando',
    'Finalizado',
    'Entregando',
    'Cancelado',
  ]);
  const [pago, setPago] = useState(['Rechazada', 'Procesando', 'Recibido']);
  const [changeStatus, setChangeStatus] = useState('');
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/all-orders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePago = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-pago/${orderId}`, {
        pago: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={'Todos los Pedidos Info'}>
      <div className="row container">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mt-4 mb-3">Todos los Pedidos</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Comprador</th>
                      <th scope="col">Compra</th>
                      <th scope="col">Pago</th>
                      <th scope="col">Productos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{o?.payment.success ? 'Realizada' : 'Fallida'}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChangePago(o._id, value)}
                          defaultValue={o?.pago}
                        >
                          {pago.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row">
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-width"
                          alt={p.name}
                          height="180px"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Precio: ${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
