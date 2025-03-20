/*
    Campos:
        clientId
        products (Array)
        total
        orderStatus
*/

//Mongoose
import {Schema, model} from "mongoose";

//Schema
const ordersSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Customers",
        require: true
    },

    products: {
        type: String
        //No me acuerdo como era para hacerlo en array, perdón profe
    },

    total: {
        //De esto tampoco me acuerdo
    },

    orderStatus: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

//Export
export default model("Orders", ordersSchema);