/*
  Campos:
    Id
    productName
    description
    price
    stock
    categories
    brandId
    imageUrl
*/

//Mongose 
import { Schema, model } from "mongoose";

//Schema
const producsSchema = new Schema({
    productName: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false,
        maxLength: 500
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
    brandId: {
        type: Schema.Types.ObjectId,
        ref: "Brands",
        require: true
    },
    imageUrl: {
        type: String,  // Guardamos la URL de la imagen
        required: false
    },
},
{
    timestamps: true,
    strict: false
}
);

export default model("Products", producsSchema);