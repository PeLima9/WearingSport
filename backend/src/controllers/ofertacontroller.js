const ofertasController = {};
import Oferta from "../models/Oferta.js";
import Producto from "../models/Products.js";

//Select / Get
ofertasController.getOfertas = async (req, res) => {
  try {
    const hoy = new Date();

    const ofertas = await Oferta.find({
      activa: true,
      fechaInicio: { $lte: hoy },   // Oferta ya inició
      fechaFin: { $gte: hoy }       // Oferta no ha vencido
    }).populate('productId');

    res.json(ofertas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ofertas", error: error.message });
  }
};

//Insert / Post
ofertasController.insertOferta = async (req, res) => {
    try {
        const { productId, descuento, fechaInicio, fechaFin } = req.body;
        
        // Validación básica
        if (!productId || !descuento || !fechaInicio || !fechaFin) {
            return res.status(400).json({ message: "ProductId, descuento, fechaInicio and fechaFin are required" });
        }
        
        // Validar que el descuento esté en rango válido
        if (descuento < 0 || descuento > 100) {
            return res.status(400).json({ message: "Descuento must be between 0 and 100" });
        }
        
        // Validar que las fechas sean válidas
        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            return res.status(400).json({ message: "fechaFin must be after fechaInicio" });
        }
        
        const newOferta = new Oferta({ productId, descuento, fechaInicio, fechaFin });
        await newOferta.save();
        res.json({ message: "Oferta Added", oferta: newOferta });
    } catch (error) {
        res.status(500).json({ message: "Error adding oferta", error: error.message });
    }
};

//Delete
ofertasController.deleteOferta = async (req, res) => {
    try {
        const deletedOferta = await Oferta.findByIdAndDelete(req.params.id);
        
        if (!deletedOferta) {
            return res.status(404).json({ message: "Oferta not found" });
        }
        
        res.json({ message: "Oferta Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting oferta", error: error.message });
    }
};

//Update / Put
ofertasController.updateOferta = async (req, res) => {
    try {
        const { productId, descuento, fechaInicio, fechaFin, activa } = req.body;
        
        // Validación básica
        if (!productId || !descuento || !fechaInicio || !fechaFin) {
            return res.status(400).json({ message: "ProductId, descuento, fechaInicio and fechaFin are required" });
        }
        
        // Validar que el descuento esté en rango válido
        if (descuento < 0 || descuento > 100) {
            return res.status(400).json({ message: "Descuento must be between 0 and 100" });
        }
        
        // Validar que las fechas sean válidas
        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            return res.status(400).json({ message: "fechaFin must be after fechaInicio" });
        }
        
        const updatedOferta = await Oferta.findByIdAndUpdate(
            req.params.id, 
            { productId, descuento, fechaInicio, fechaFin, activa }, 
            { new: true }
        );
        
        if (!updatedOferta) {
            return res.status(404).json({ message: "Oferta not found" });
        }
        
        res.json({ message: "Oferta Updated", oferta: updatedOferta });
    } catch (error) {
        res.status(500).json({ message: "Error updating oferta", error: error.message });
    }
};

//Método adicional para desactivar oferta
ofertasController.deactivateOferta = async (req, res) => {
    try {
        const updatedOferta = await Oferta.findByIdAndUpdate(
            req.params.id, 
            { activa: false }, 
            { new: true }
        );
        
        if (!updatedOferta) {
            return res.status(404).json({ message: "Oferta not found" });
        }
        
        res.json({ message: "Oferta Deactivated", oferta: updatedOferta });
    } catch (error) {
        res.status(500).json({ message: "Error deactivating oferta", error: error.message });
    }
};

//Export
export default ofertasController;