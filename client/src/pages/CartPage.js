import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Precio Total
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    } catch (error) {
      console.log(error);
    }
  };
  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //GET PAYMENT GATEWAY TOKEN
  const getToken = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/braintree/token');
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handlePayment

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('/api/v1/product/braintree/payment', {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success('Pago Realizado Exitosamente');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hola ${auth?.token && auth?.user?.username}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `Tienes ${cart.length} productos en tu carrito ${
                    auth?.token ? '' : ' Por favor Inicia Sesion para verificar'
                  }`
                : 'Tu Carrito esta Vacio'}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="120px"
                    height="160px"
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Precio: ${p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Carrito Resumen</h4>
            <p>Total | Checkout | Pago</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.phone ? (
              <div className="mb-3">
                <h4>Número de Telefono Actual</h4>
                <h5>{auth?.user?.phone}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate('/dashboard/user/profile')}
                >
                  Actualizar Número
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate('/dashboard/user/profile')}
                  >
                    Actualizar Número
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate('/login', {
                        state: '/cart',
                      })
                    }
                  >
                    Por Favor Inicia Sesion para Verificar
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ''
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: 'vault',
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={!instance || !auth?.user?.phone}
                  >
                    {loading ? 'Procesando...' : 'Hacer el Pago'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
