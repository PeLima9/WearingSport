/*
    Campos: 
        name
        email
        password
*/

//Mongoose
import {Schema, model} from "mongoose";

//Schema
const employeesSchema = new Schema({
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
        minLength: 6
    }
}, {
    timestamps: true,
    strict: false
});

//Export
export default model("Employees", employeesSchema);