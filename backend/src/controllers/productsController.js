import { v2 as cloudinary } from "cloudinary";
import productsModel from "../models/Products.js";
import Oferta from "../models/Oferta.js";
import { config } from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Subir imagen a Cloudinary
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

// Función nueva para obtener productos con su oferta activa (vigente)
productsController.getProductsConOferta = async (req, res) => {
  try {
    const hoy = new Date();

    // Obtener todos los productos con categorías y marcas
    const productos = await productsModel.find()
      .populate('categories', 'categoryName')
      .populate('brandId', 'brandName')
      .lean(); // lean para obtener objetos planos y poder modificar

    // Para cada producto buscar oferta activa y vigente
    const productosConOferta = await Promise.all(
      productos.map(async (prod) => {
        const oferta = await Oferta.findOne({
          productId: prod._id,
          activa: true,
          fechaInicio: { $lte: hoy },
          fechaFin: { $gte: hoy }
        }).lean();

        return { ...prod, oferta }; // agrega la oferta (o undefined si no hay)
      })
    );

    res.json(productosConOferta);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos con ofertas", error: error.message });
  }
};

productsController.getProductById = async (req, res) => {
  try {
    const product = await productsModel
      .findById(req.params.id)
      .populate('categories', 'categoryName')
      .populate('brandId', 'brandName')
      .lean();

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Buscar oferta activa si existe
    const hoy = new Date();
    const oferta = await Oferta.findOne({
      productId: product._id,
      activa: true,
      fechaInicio: { $lte: hoy },
      fechaFin: { $gte: hoy }
    }).lean();

    if (oferta) {
      product.oferta = oferta;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// GET: todos los productos
productsController.getProducts = async (req, res) => {
  try {
    const products = await productsModel
      .find()
      .populate('categories', 'categoryName')
      .populate('brandId', 'brandName');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// POST: insertar producto con imagen
productsController.insertProducts = async (req, res) => {
  const { productName, description, price, stock, categories, brandId } = req.body;
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: "No se subió ninguna imagen" });
  }

  const validImageTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'image/svg+xml', 'image/avif', 'image/jpg'
  ];

  if (!validImageTypes.includes(file.mimetype)) {
    return res.status(400).json({ message: "Formato de imagen no válido" });
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
    res.json({ message: "Producto agregado exitosamente", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al subir imagen", error });
  }
};

// PUT: actualizar producto (con imagen opcional)
productsController.updateProducts = async (req, res) => {
  const { productName, description, price, stock, categories, brandId } = req.body;
  const { file } = req;

  try {
    const updateData = {
      productName,
      description,
      price,
      stock,
      categories,
      brandId
    };

    if (file) {
      const validImageTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'image/svg+xml', 'image/avif', 'image/jpg'
      ];

      if (!validImageTypes.includes(file.mimetype)) {
        return res.status(400).json({ message: "Formato de imagen no válido" });
      }

      const result = await uploadToCloudinary(file.buffer);
      updateData.imageUrl = result.secure_url;
    }

    const updatedProduct = await productsModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "Producto actualizado", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error });
  }
};

// DELETE: eliminar producto
productsController.deleteProducts = async (req, res) => {
  try {
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};

export default productsController;
