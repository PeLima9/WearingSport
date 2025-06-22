import reviewsModel from "../models/Reviews.js";
import Pedido from "../models/Pedido.js";

const reviewsController = {};

// Obtener todas las reviews con info de cliente y producto (para admin)
reviewsController.getReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel
      .find()
      .populate("idClient", "name email")        // información del cliente
      .populate("idProducts", "productName price"); // información del producto
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reviews", error });
  }
};

// Insertar nueva review
reviewsController.insertReviews = async (req, res) => {
  try {
    const { qualification, comment, idProducts, idClient } = req.body;
    const newReview = new reviewsModel({ qualification, comment, idProducts, idClient });
    await newReview.save();
    res.json({ message: "Review agregada" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar la review", error });
  }
};

// Eliminar review
reviewsController.deleteReviews = async (req, res) => {
  try {
    await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Review eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la review", error });
  }
};

// Actualizar review
reviewsController.updateReviews = async (req, res) => {
  try {
    const { qualification, comment, idProducts, idClient } = req.body;
    const updatedReview = await reviewsModel.findByIdAndUpdate(
      req.params.id,
      { qualification, comment, idProducts, idClient },
      { new: true }
    );
    res.json({ message: "Review actualizada", updatedReview });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la review", error });
  }
};

// Obtener reviews por producto con información del cliente
reviewsController.getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewsModel
      .find({ idProducts: productId })
      .populate("idClient", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas", error });
  }
};

// Validar si un usuario compró un producto (para permitir valorar)
reviewsController.usuarioComproProducto = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Buscar pedidos del usuario donde esté el producto comprado
    const pedidos = await Pedido.find({
      userId: userId,
      "productos._id": productId
    });

    if (pedidos.length > 0) {
      return res.json({ puedeValorar: true });
    } else {
      return res.json({ puedeValorar: false });
    }
  } catch (error) {
    console.error("Error validando compra para valoración:", error);
    res.status(500).json({ puedeValorar: false, message: "Error del servidor" });
  }
};

export default reviewsController;
