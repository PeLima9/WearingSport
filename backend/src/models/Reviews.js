/*
  Campos:
    qualification
    comment
    idProducts
    idClient
*/

//Mongose
import { Schema, model } from "mongoose";

//Schema
const reviewsSchema = new Schema({
    qualification: {
        type: Number,
        require: true,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        require: true
    },
    idProducts: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        require: true
    },
    idClient: {
        type: Schema.Types.ObjectId,
        ref: "Customers",
        require: true
    }
},
{
    timestamps: true,
    strict: false,
  }
);

export default model("Reviews", reviewsSchema);