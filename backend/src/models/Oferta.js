/*
    Campos:
         productId
         descuento
         fechaInicio
         fechaFin
         activa
*/

//Mongoose
import {Schema, model} from "mongoose";

//Schema
const ofertaSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    
    descuento: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    
    fechaInicio: {
        type: Date,
        required: true
    },
    
    fechaFin: {
        type: Date,
        required: true
    },
    
    activa: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    strict: false
});

//Export
export default model("Oferta", ofertaSchema);