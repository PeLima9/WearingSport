import { v2 as cloudinary } from "cloudinary";
import productsModel from "../models/Products.js";
import { config } from "../config.js";

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

// Función para subir imagen a Cloudinary desde buffer
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'products' },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

const productsController = {};

// GET: obtener todos los productos con categorías y marcas
productsController.getProducts = async (req, res) => {
  try {
    const products = await productsModel
      .find()
      .populate('categories', 'categoryName')
      .populate('brandId', 'brandName');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

// POST: insertar nuevo producto con imagen subida a Cloudinary
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
    const result = await uploadToCloudinary(file.buffer);

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

// DELETE: eliminar producto
productsController.deleteProducts = async (req, res) => {
  try {
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// PUT: actualizar producto (sin imagen)
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
