import { Router } from 'express';
import { getProductos, getProductoById, marcarFavorito, obtenerFavoritos, eliminarFavorito } from '../controllers/products.controller.js'; // Ajusta la ruta según tu estructura de proyecto

const router = Router();

// Ruta para obtener la lista de productos
router.get('/products', getProductos);

// Ruta para obtener un producto por ID
router.get('/products/:id', getProductoById);

// Ruta para marcar un producto como favorito
router.post('/products/favoritos', marcarFavorito);

// Ruta para obtener los productos favoritos de un usuario
router.get('/products/favoritos/:usuario_id', obtenerFavoritos);

// Ruta para eliminar un producto favorito de un usuario
router.delete('/favoritos/:usuario_id/:producto_id', eliminarFavorito);

export default router;