// models/Pedido.js
import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers', required: true }, // ✅ AQUÍ
  productos: [
    {
      _id: String,
      name: String,
      descripcion: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  total: Number,
  estado: { type: String, default: 'Pendiente' },
  idOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Orders' },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model('Pedido', pedidoSchema);
