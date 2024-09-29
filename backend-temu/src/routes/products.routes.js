import { Router } from 'express';
import { getProductos } from '../controllers/products.controller.js'; // Ajusta la ruta según tu estructura de proyecto

const router = Router();

// Ruta para obtener la lista de productos
router.get('/products', getProductos);

export default router;