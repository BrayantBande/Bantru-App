import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
  try {
    const { username, name, email, password, phone, answer } = req.body;
    //validacion
    if (!username) {
      return res.send({ message: 'Usuario es Requerido' });
    }
    if (!name) {
      return res.send({ message: 'Nombre es Requerido' });
    }
    if (!email) {
      return res.send({ message: 'Correo es Requerido' });
    }
    if (!password) {
      return res.send({ message: 'Contraseña es Requerida' });
    }
    if (!phone) {
      return res.send({ message: 'Número es Requerido' });
    }
    if (!answer) {
      return res.send({ message: 'Respuesta es Requerida' });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //Existing user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: 'Ya estas registrado por favor Inicia Sesión',
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      username,
      name,
      email,
      phone,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: 'Usuario Registrado Exitosamente',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error al Registrarse',
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Email o Contraseña invalida',
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'No estas registrado',
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Contraseña Invalida',
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).send({
      success: true,
      message: 'Inicio de Sesion Exitoso',
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error al Iniciar Sesion',
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: 'El Email es requerido' });
    }
    if (!answer) {
      res.status(400).send({ message: 'Respuesta es requerida' });
    }
    if (!newPassword) {
      res.status(400).send({ message: 'Nueva Contraseña es requerida' });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email o Respuesta Incorrecta',
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: 'Contraseña Cambiada Exitosamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Algo Salio Mal',
      error,
    });
  }
};

//test Controller
export const testController = (req, res) => {
  try {
    res.send('Ruta Protegida');
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//actualizar perfil
export const updateProfileController = async (req, res) => {
  try {
    const { username, name, password, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: 'Contraseña de minimo 6 Caracteres' });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        username: username || user.username,
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: 'Perfil actualizado exitosamente',
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error al Actualizar Perfil',
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate('products', '-photo')
      .populate('buyer', 'name');
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error al Obtener Pedidos',
      error,
    });
  }
};

//orders all
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate('products', '-photo')
      .populate('buyer', 'name')
      .sort({ createAt: '-1' });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error al Obtener Pedidos',
      error,
    });
  }
};

//order Status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error al Actualizar Pedido',
      error,
    });
  }
};
