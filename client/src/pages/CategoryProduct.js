import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import axios from 'axios';
import '../styles/CategoryProductStyles.css';

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Categoria - {category?.name}</h4>
        <h6 className="text-center">
          {products?.length} Resultados Encontrados
        </h6>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </h5>
                  </div>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <div className="card-name-price">
                    <button
                      class="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Detalles
                    </button>
                    <button
                      class="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          'cart',
                          JSON.stringify([...cart, p])
                        );
                        toast.success('Producto añadido Existosamente');
                      }}
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Cargando...' : 'Cargar Mas'}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
