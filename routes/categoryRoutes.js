import express from 'express';
import { isAdmin, requiredSignIn } from './../middlewares/authMiddleware.js';
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from '../controllers/categoryController.js';

const router = express.Router();

//routes
//crear category
router.post(
  '/create-category',
  requiredSignIn,
  isAdmin,
  createCategoryController
);

//actualizar categoria
router.put(
  '/update-category/:id',
  requiredSignIn,
  isAdmin,
  updateCategoryController
);

//get Todas las Categorias
router.get('/get-category', categoryController);

//single category
router.get('/single-category/:slug', singleCategoryController);

//delete category
router.delete(
  '/delete-category/:id',
  requiredSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
