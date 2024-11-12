// Importa las dependencias necesarias
import express from 'express';
import request from 'supertest';
import { pool } from '../../db.js';
import { obtenerPedidoPorId, obtenerPedidosPorUsuario, eliminarPedidoPorId, actualizarEstadoPedido } from './../../controllers/orders.controller.js';

// Configura la aplicación Express y las rutas
const app = express();
app.use(express.json());

app.get('/pedidos/:id', obtenerPedidoPorId);
app.get('/usuarios/:usuario_id/pedidos', obtenerPedidosPorUsuario);
app.put('/pedidos/:id/estado', actualizarEstadoPedido);
app.delete('/pedidos/:id', eliminarPedidoPorId);

let server;

beforeAll((done) => {
    server = app.listen(done);
});

afterAll((done) => {
    server.close(() => {
        // Cierra todas las conexiones a la base de datos
        pool.end();
        done();
    });
});

describe('Controladores de Pedidos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test para actualizar el estado de un pedido
    it('Debería actualizar el estado de un pedido existente', async () => {
        const mockPedidoRows = [{ id: 1 }];
        pool.query = jest.fn()
            .mockResolvedValueOnce([mockPedidoRows]) // Mock para verificar si el pedido existe
            .mockResolvedValueOnce(); // Mock para actualizar el estado del pedido

        const response = await request(app)
            .put('/pedidos/1/estado')
            .send({ estado: 'Enviado' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Estado del pedido actualizado correctamente');
    });

    // Test para manejar errores al actualizar el estado de un pedido
    it('Debería manejar errores al actualizar el estado de un pedido', async () => {
        pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

        const response = await request(app)
            .put('/pedidos/1/estado')
            .send({ estado: 'Enviado' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error al actualizar el estado del pedido');
    });

    // Test para manejar pedido no encontrado
    it('Debería devolver 500 si el pedido no se encuentra', async () => {
        pool.query = jest.fn().mockResolvedValueOnce([]); // Mock para verificar si el pedido existe

        const response = await request(app)
            .put('/pedidos/9999/estado') // ID de pedido que no existe
            .send({ estado: 'Enviado' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error al actualizar el estado del pedido');
    });

    // Test para obtener un pedido por ID
    it('Debería obtener un pedido por ID', async () => {
        const mockPedido = { id: 1, estado: 'Pendiente', direccion_envio_id: 1 };
        const mockDetalles = [{ id: 1, producto_id: 1, cantidad: 2 }];
        const mockEnvio = { id: 1, direccion: '123 Calle Falsa' };

        pool.query = jest.fn()
            .mockResolvedValueOnce([[mockPedido]]) // Mock para obtener el pedido
            .mockResolvedValueOnce([mockDetalles]) // Mock para obtener los detalles del pedido
            .mockResolvedValueOnce([[mockEnvio]]); // Mock para obtener la información de envío

        const response = await request(app)
            .get('/pedidos/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ pedido: mockPedido, detalles: mockDetalles, envio: mockEnvio });
    });

    // Test para manejar errores al obtener un pedido por ID
    it('Debería manejar errores al obtener un pedido por ID', async () => {
        pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

        const response = await request(app)
            .get('/pedidos/1');

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error al obtener el pedido');
    });

    // Test para obtener los pedidos de un usuario
    it('Debería obtener los pedidos de un usuario', async () => {
        const mockPedidos = [];

        pool.query = jest.fn().mockResolvedValueOnce([mockPedidos]); // Mock para obtener los pedidos del usuario

        const response = await request(app)
            .get('/usuarios/1/pedidos');

        expect(response.statusCode).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
    });

    // Test para manejar errores al obtener los pedidos de un usuario
    it('Debería manejar errores al obtener los pedidos de un usuario', async () => {
        pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

        const response = await request(app)
            .get('/usuarios/1/pedidos');

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error al obtener los pedidos del usuario');
    });

    // Test para eliminar un pedido por ID
    it('Debería eliminar un pedido por ID', async () => {
        pool.query = jest.fn()
            .mockResolvedValueOnce([{ id: 1 }]) // Mock para verificar si el pedido existe
            .mockResolvedValueOnce() // Mock para eliminar los detalles del pedido
            .mockResolvedValueOnce(); // Mock para eliminar el pedido

        const response = await request(app)
            .delete('/pedidos/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Pedido eliminado correctamente');
    });

    // Test para manejar errores al eliminar un pedido por ID
    it('Debería manejar errores al eliminar un pedido por ID', async () => {
        pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

        const response = await request(app)
            .delete('/pedidos/1');

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error al eliminar el pedido');
    });
});