import express from 'express';
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from '../controllers/authController.js';
import { isAdmin, requiredSignIn } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router();

//routing
//REGISTRO || POST
router.post('/register', registerController);

//INICIO DE SESION || POST
router.post('/login', loginController);

//Olvido de Clave || POST
router.post('/forgot-password', forgotPasswordController);

//Test Routes
router.get('/test', requiredSignIn, isAdmin, testController);

//Protected User Route auth
router.get('/user-auth', requiredSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//Protected Admin Route auth
router.get('/admin-auth', requiredSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update perfil
router.put('/profile', requiredSignIn, updateProfileController);

//orders
router.get('/orders', requiredSignIn, getOrdersController);

//orders all
router.get('/all-orders', requiredSignIn, isAdmin, getAllOrdersController);

// order update
router.put(
  '/order-status/:orderId',
  requiredSignIn,
  isAdmin,
  orderStatusController
);
export default router;
