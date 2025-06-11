import { v2 as cloudinary } from "cloudinary";
import productsModel from "../models/Products.js";
import { config } from "../config.js";

// Configurar Cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

const productsController = {};

// GET: obtener todos los productos con datos de categoría y marca
productsController.getProducts = async (req, res) => {
    try {
        const products = await productsModel
            .find()
            .populate('categories', 'categoryName')  // Agrega nombre de la categoría
            .populate('brandId', 'brandName');       // Agrega nombre de la marca

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error });
    }
};

// POST: insertar nuevo producto
productsController.insertProducts = async (req, res) => {
    const { productName, description, price, stock, categories, brandId } = req.body;
    const { file } = req;

    if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.mimetype)) {
        return res.status(400).json({ message: "Invalid image format. Please upload a valid image." });
    }

    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'products',
            resource_type: 'auto',
        });

        const newProduct = new productsModel({
            productName,
            description,
            price,
            stock,
            categories,
            brandId,
            imageUrl: result.secure_url,
        });

        await newProduct.save();

        res.json({ message: "Product added successfully", newProduct });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Error uploading image to Cloudinary", error });
    }
};

// DELETE
productsController.deleteProducts = async (req, res) => {
    try {
        await productsModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

// PUT / Update
productsController.updateProducts = async (req, res) => {
    const { productName, description, price, stock, categories, brandId } = req.body;
    try {
        const updatedProduct = await productsModel.findByIdAndUpdate(
            req.params.id,
            { productName, description, price, stock, categories, brandId },
            { new: true }
        );
        res.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

export default productsController;
