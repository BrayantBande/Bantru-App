import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: 'Productos',
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: 'users',
    },
    status: {
      type: String,
      default: 'No Procesada',
      enum: [
        'No Procesada',
        'Procesando',
        'Finalizado',
        'Entregando',
        'Cancelado',
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
