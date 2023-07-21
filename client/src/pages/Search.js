import React from 'react';
import Layout from './../components/Layout/Layout';
import { useSearch } from '../context/search';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import '../styles/CategoryProductStyles.css';
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <Layout title={'Resultado de Busqueda'}>
      <div className="container mt-3 category">
        <div className="text-center">
          <h1>Resultados de Busqueda</h1>
          <h6>
            {values?.results.length < 1
              ? 'No se Encontro ningun producto'
              : `Encontrado ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
