import express from 'express';
import { isAdmin, requiredSignIn } from '../middlewares/authMiddleware.js';
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

//routes
router.post(
  '/create-product',
  requiredSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  '/update-product/:pid',
  requiredSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get Products
router.get('/get-product', getProductController);

//single Product
router.get('/get-product/:slug', getSingleProductController);

//get Photo
router.get('/product-photo/:pid', productPhotoController);

//delete product
router.delete('/delete-product/:pid', deleteProductController);

//filter
router.post('/product-filters', productFilterController);

// product Count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//Buscar Producto
router.get('/search/:keyword', searchProductController);

//Similar Productos
router.get('/related-product/:pid/:cid', realtedProductController);

//category wise product
router.get('/product-category/:slug', productCategoryController);

//Pago Routes
//Token
router.get('/braintree/token', braintreeTokenController);

//Pagos
router.post('/braintree/payment', requiredSignIn, braintreePaymentController);

export default router;
