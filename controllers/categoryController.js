import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: 'Nombre es Requerido' });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: 'Esta Categoria Ya Existe',
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: 'Nueva Categoria Creada',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error en Categoria',
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: 'Categoria Actualizada',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error al Actualizar Categoria',
    });
  }
};

//get all category
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: 'Todas las Categorias',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error al Obtener Las Categorias',
    });
  }
};

//single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: 'Se Obtuvo la Categoria',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error al Buscar la Categoria',
    });
  }
};

//delete Category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: 'Categoria Eliminada',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error al Eliminar Categoria',
      error,
    });
  }
};
