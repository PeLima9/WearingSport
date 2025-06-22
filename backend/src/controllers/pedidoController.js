import Pedido from "../models/Pedido.js";

// Crear nuevo pedido
const crearPedido = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: "No autenticado" });
  
  try {
    const { productos, total, idOrder } = req.body;

    if (!productos || !total || !idOrder) {
      return res.status(400).json({ success: false, message: "Faltan datos para crear el pedido" });
    }

    const nuevoPedido = new Pedido({
      userId: req.user._id,
      productos,
      total,
      estado: 'Pendiente',
      idOrder,
      fecha: new Date()
    });

    await nuevoPedido.save();

    res.status(201).json({ success: true, message: "Pedido creado con éxito" });
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

// Obtener pedidos del usuario autenticado
const obtenerMisPedidos = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: "No autenticado" });

  try {
    const pedidos = await Pedido.find({ userId: req.user._id }).sort({ fecha: -1 });
    res.json({ success: true, pedidos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener pedidos" });
  }
};

// Obtener todos los pedidos (solo admin)
const obtenerTodosLosPedidos = async (req, res) => {
  if (!req.userType || req.userType !== "admin") {
    return res.status(403).json({ success: false, message: "No autorizado" });
  }

  try {
    const pedidos = await Pedido.find()
      .populate("userId", "name email")
      .sort({ fecha: -1 });

    res.json({ success: true, pedidos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener pedidos" });
  }
};

// Cambiar estado de un pedido (solo admin)
const cambiarEstadoPedido = async (req, res) => {
  if (!req.userType || req.userType !== "admin") {
    return res.status(403).json({ success: false, message: "No autorizado" });
  }

  try {
    const { id } = req.params;
    const { nuevoEstado } = req.body;

    if (!nuevoEstado) {
      return res.status(400).json({ success: false, message: "Debe especificar el nuevo estado" });
    }

    const pedido = await Pedido.findByIdAndUpdate(
      id,
      { estado: nuevoEstado },
      { new: true }
    );

    if (!pedido) {
      return res.status(404).json({ success: false, message: "Pedido no encontrado" });
    }

    res.json({ success: true, pedido });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al actualizar el estado" });
  }
};

// Verifica si un usuario ha comprado un producto
const haCompradoProducto = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const pedido = await Pedido.findOne({
      userId,
      "productos._id": productId,
    });
    res.json({ hasBought: !!pedido });
  } catch (error) {
    console.error("Error al verificar compra:", error);
    res.status(500).json({ message: "Error al verificar compra" });
  }
};


export default {
  crearPedido,
  obtenerMisPedidos,
  obtenerTodosLosPedidos,
  cambiarEstadoPedido,
  haCompradoProducto,
};
