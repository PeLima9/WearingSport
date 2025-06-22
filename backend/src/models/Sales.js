/*
   Campos:
      idOrder
      paymentMethod
      Address
*/

//Mongoose
import { Schema, model } from "mongoose";

//Schema
const salesSchema = new Schema({
    idOrder: {
        type: Schema.Types.ObjectId,
        ref: "Orders",
        require: true
    },
    paymentMethod: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    }
},
{
    timestamps: true,
    strict: false,
  });

  export default model("Sales", salesSchema);