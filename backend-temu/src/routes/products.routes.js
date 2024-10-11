import { Router } from 'express';
import { getProductos, getProductoById } from '../controllers/products.controller.js'; // Ajusta la ruta según tu estructura de proyecto

const router = Router();

// Ruta para obtener la lista de productos
router.get('/products', getProductos);

// Ruta para obtener un producto por ID
router.get('/products/:id', getProductoById);

export default router;