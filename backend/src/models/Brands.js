/*
    Campos:
        brandName
        description
        country
*/

//Mongoose
import {Schema, model} from "mongoose";

//Schema
const brandsSchema = new Schema({
    brandName: {
        type: String,
        require: true,
    },

    description: {
        type: String,
        require: false,
        maxLength: 500
    },

    country: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
    strict: false
});

//Export
export default model("Brands", brandsSchema);