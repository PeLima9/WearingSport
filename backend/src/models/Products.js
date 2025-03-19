/*
  Campos:
    Id
    productName
    description
    price
    stock
    categories
    brandId
*/

//Mongose 
import { Schema, model } from "mongoose";

//Schema
const producsSchema = new Schema({
    productName: {
        type: String,
        require: True
    },
    description: {
        type: String,
        require: false,
        maxLenght: 500
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    stock: {
        type: Number,
        require: true,
        min: 0
    },
    categories: {
        type: String,
        require: true,
    },
    idBrands: {
        type: Schema.Types.ObjectId,
        ref: "Brands",
        require: true
    },
},
{
    timestamps: true,
    strict: false
}
);

export default model("Products", producsSchema);