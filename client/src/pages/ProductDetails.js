import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useCart } from '../context/cart';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetailsStyles.css';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //Get Similar Products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="500"
            width={'350px'}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Detalles del Producto</h1>
          <hr />
          <h6>Nombre : {product.name}</h6>
          <h6>Descripcion : {product.description}</h6>
          <h6>
            Precio :
            {product?.price?.toLocaleString('es-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </h6>
          <h6>Categoria : {product?.category?.name}</h6>
          <h6>Cantidad Disponible : {product.quantity}</h6>
          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem('cart', JSON.stringify([...cart, product]));
              toast.success('Producto añadido Existosamente');
            }}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h6>Productos Similares ➡️</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center p-4">No hay Productos Similares</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
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
                <p className="card-text">{p.description.substring(0, 60)}...</p>
                <div className="card-name-price">
                  <button
                    class="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Detalles
                  </button>
                </div>

                {/* <button class="btn btn-secondary ms-1">
                  Añadir al Carrito
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
