// controllers/salesController.js
import salesModel from "../models/Sales.js";
import Order from "../models/Orders.js"; // ✅ Importar el modelo de órdenes
import productsModel from "../models/Products.js"; // ✅ Importar el modelo de productos

const salesController = {};

// GET todas las ventas
salesController.getSales = async (req, res) => {
  try {
    const sales = await salesModel.find().populate("idOrder");
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ventas", error });
  }
};

// POST crear nueva venta
salesController.insertSales = async (req, res) => {
  try {
    const { idOrder, paymentMethod, address } = req.body;

    console.log("🟡 Datos recibidos:", { idOrder, paymentMethod, address });

    if (!idOrder || !paymentMethod || !address) {
      console.log("❌ Faltan campos requeridos");
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // 1. Crear la venta
    const newSales = new salesModel({ idOrder, paymentMethod, address });
    const saved = await newSales.save();
    console.log("✅ Venta guardada:", saved);

    // 2. Obtener la orden para descontar stock
    const order = await Order.findById(idOrder);
    if (!order) {
      console.log("❌ Orden no encontrada");
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    console.log("📦 Orden encontrada:", order);

    // 3. Actualizar stock por producto
    for (const item of order.products) {
      const { productId, quantity } = item;
      const product = await productsModel.findById(productId);

      if (!product) {
        console.log(`⚠️ Producto no encontrado: ${productId}`);
        continue;
      }

      if (product.stock < quantity) {
        console.log(`❌ Stock insuficiente para ${product.productName}`);
        return res.status(400).json({ message: `Stock insuficiente para ${product.productName}` });
      }

      product.stock -= quantity;
      await product.save();
      console.log(`✅ Stock actualizado para ${product.productName}`);
    }

    res.status(201).json({ message: "Venta registrada y stock actualizado", sale: saved });
  } catch (error) {
    console.error("🔥 Error al registrar venta:", error);
    res.status(500).json({ message: "Error al registrar venta", error });
  }
};

// DELETE
salesController.deleteSales = async (req, res) => {
  try {
    await salesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Venta eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar venta", error });
  }
};

// PUT
salesController.updateSales = async (req, res) => {
  try {
    const { idOrder, paymentMethod, address } = req.body;

    const updated = await salesModel.findByIdAndUpdate(
      req.params.id,
      { idOrder, paymentMethod, address },
      { new: true }
    );

    res.json({ message: "Venta actualizada", updated });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar venta", error });
  }
};

export default salesController;
