import { Router } from 'express';
import { obtenerPedidoPorId, obtenerPedidosPorUsuario, eliminarPedidoPorId, actualizarEstadoPedido } from '../controllers/orders.controller.js';

const router = Router();

// Ruta para obtener un pedido por ID
router.get('/pedidos/:id', obtenerPedidoPorId);

// Ruta para obtener los pedidos de un usuario
router.get('/usuarios/:usuario_id/pedidos', obtenerPedidosPorUsuario);

// Ruta para actualizar el estado de un pedido
router.put('/pedidos/:id/estado', actualizarEstadoPedido);

// Ruta para eliminar un pedido por ID (solo para administradores)
router.delete('/pedidos/:id', eliminarPedidoPorId);

export default router;