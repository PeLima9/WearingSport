import dotenv from "dotenv";

//Ejecutar Librería
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI,
    },

    server: {
        PORT: process.env.PORT,
    },
};