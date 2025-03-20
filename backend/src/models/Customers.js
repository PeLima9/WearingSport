/*
    Campos:
        name
        email
        password
        phoneNumber
*/

//Mongoose
import {Schema, model} from "mongoose";

//Schema
const customersSchema = new Schema({
    name: {
        type: String,
        require: true,
        maxLength: 100
    },

    email: {
        type: String,
        require: true,
        maxLength: 50
    },

    password: {
        type: String,
        require: true,
        minLength: 6,
    },

    phoneNumber: {
        type: String,
        require: true,
        maxLength: 8
    }
}, {
    timestamps: true,
    strict: false
});

//Export
export default model("Customers", customersSchema);