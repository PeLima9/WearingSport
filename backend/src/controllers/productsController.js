import { v2 as cloudinary } from "cloudinary";
import productsModel from "../models/Products.js";
import { config } from "../config.js";

// 1. Configurar Cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

const productsController = {};

// Select / Get
productsController.getProducts = async (req, res) => {
    try {
        const products = await productsModel.find().populate('brandId');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error });
    }
};

// Insert / Post
productsController.insertProducts = async (req, res) => {
    const { productName, description, price, stock, categories, brandId } = req.body;
    const { file } = req; // Aquí obtenemos el archivo de imagen

    // Verificar si se ha subido una imagen
    if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
    }

    // Validación de tipo de imagen (solo imágenes JPEG, PNG o GIF)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.mimetype)) {
        return res.status(400).json({ message: "Invalid image format. Please upload a valid image." });
    }

    try {
        // Subir imagen a Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'products', // Se almacenará en la carpeta 'products' de Cloudinary
            resource_type: 'auto', // Detecta automáticamente el tipo de archivo (imagen, video, etc.)
        });

        // Crear un nuevo producto con la URL de la imagen
        const newProduct = new productsModel({
            productName,
            description,
            price,
            stock,
            categories,
            brandId,
            imageUrl: result.secure_url, // Guardar la URL de la imagen en la base de datos
        });

        // Guardar el producto en la base de datos
        await newProduct.save();

        // Responder con el éxito de la operación
        res.json({ message: "Product added successfully", newProduct });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Error uploading image to Cloudinary", error });
    }
};

// Delete / Remove
productsController.deleteProducts = async (req, res) => {
    try {
        await productsModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

// Update / Put
productsController.updateProducts = async (req, res) => {
    const { productName, description, price, stock, categories, brandId} = req.body;
    try {
        const updatedProduct = await productsModel.findByIdAndUpdate(
            req.params.id,
            { productName, description, price, stock, categories, brandId },
            { new: true } // Devuelve el producto actualizado
        );
        res.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

export default productsController;
