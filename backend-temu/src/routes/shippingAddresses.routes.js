import { Router } from 'express';
import { createShippingAddress, getShippingAddresses, updateShippingAddress, deleteShippingAddress } from '../controllers/shippingAddresses.controller.js'; // Ajusta la ruta según tu estructura de proyecto

const router = Router();

// Ruta para crear una dirección de envío
router.post('/shipping-addresses', createShippingAddress);

// Ruta para obtener las direcciones de envío de un usuario
router.get('/shipping-addresses/:usuario_id', getShippingAddresses);

// Ruta para actualizar una dirección de envío
router.put('/shipping-addresses/:id', updateShippingAddress);

// Ruta para eliminar una dirección de envío
router.delete('/shipping-addresses', deleteShippingAddress);

export default router;