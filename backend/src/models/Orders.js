import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },

  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

  total: {
    type: Number,
    required: true,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "Pendiente",
  },
}, {
  timestamps: true,
  strict: false,
});

export default model("Orders", ordersSchema);
