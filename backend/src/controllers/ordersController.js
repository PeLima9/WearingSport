import Orders from "../models/Orders.js";
import productsModel from "../models/Products.js";

const ordersController = {};

// GET: obtener todas las órdenes
ordersController.getOrders = async (req, res) => {
  try {
    const orders = await Orders.find().populate("clientId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes", error });
  }
};

// POST: crear nueva orden con validación de stock
ordersController.createOrder = async (req, res) => {
  try {
    const { clientId, products, total, orderStatus } = req.body;

    if (!clientId || !products || !total || !orderStatus) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Verificar stock para cada producto
    for (const item of products) {
      const producto = await productsModel.findById(item.productId);

      if (!producto) {
        return res.status(404).json({ message: `Producto con ID ${item.productId} no encontrado.` });
      }

      if (producto.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuficiente para "${producto.productName}". Disponibles: ${producto.stock}, solicitados: ${item.quantity}`,
        });
      }
    }

    // Si todo está bien, crear orden
    const newOrder = new Orders({
      clientId,
      products,
      total,
      orderStatus,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Orden creada exitosamente", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error al crear orden", error });
  }
};

// PUT: actualizar orden
ordersController.updateOrder = async (req, res) => {
  try {
    const { clientId, products, total, orderStatus } = req.body;

    const updated = await Orders.findByIdAndUpdate(
      req.params.id,
      { clientId, products, total, orderStatus },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    res.json({ message: "Orden actualizada", updated });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar orden", error });
  }
};

// DELETE: eliminar orden
ordersController.deleteOrder = async (req, res) => {
  try {
    const deleted = await Orders.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Orden no encontrada para eliminar" });
    }

    res.json({ message: "Orden eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar orden", error });
  }
};

export default ordersController;
