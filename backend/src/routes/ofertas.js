import express from 'express';
import ofertasController from '../controllers/ofertacontroller.js'; // ✅ Usamos import default

const router = express.Router();

router.get('/', ofertasController.getOfertas);
router.post('/', ofertasController.insertOferta);
router.delete('/:id', ofertasController.deleteOferta);
router.put('/:id', ofertasController.updateOferta);
router.patch('/:id/desactivar', ofertasController.deactivateOferta);

export default router;
