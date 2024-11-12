// Importa las dependencias necesarias
import express from 'express';
import request from 'supertest';
import { pool } from '../../db.js';
import { createCoupon, editCoupon, deleteCoupon, verifyCoupon } from './../../controllers/coupons.controller.js';

// Configura la aplicación Express y las rutas
const app = express();
app.use(express.json());

app.post('/coupons', createCoupon);
app.put('/coupons/:id', editCoupon);
app.delete('/coupons/:id', deleteCoupon);
app.post('/coupons/verify', verifyCoupon);

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

describe('Controladores de Cupones', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test para crear un cupón
    it('Debería crear un nuevo cupón', async () => {
        const mockResult = { insertId: 1 };
        pool.query = jest.fn().mockResolvedValueOnce([mockResult]);

        const response = await request(app)
            .post('/coupons')
            .send({ codigo: 'TESTCODE', descuento: 10, fecha_expiracion: '2023-12-31' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Cupón creado exitosamente');
        expect(response.body).toHaveProperty('id', mockResult.insertId);
    });

    // Test para editar un cupón
    it('Debería editar un cupón existente', async () => {
        pool.query = jest.fn().mockResolvedValueOnce();

        const response = await request(app)
            .put('/coupons/1')
            .send({ codigo: 'NEWCODE', descuento: 15, fecha_expiracion: '2023-12-31' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Cupón actualizado exitosamente');
    });

    // Test para eliminar un cupón
    it('Debería eliminar un cupón existente', async () => {
        pool.query = jest.fn().mockResolvedValueOnce();

        const response = await request(app)
            .delete('/coupons/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Cupón eliminado exitosamente');
    });

    // Test para verificar un cupón válido
    it('Debería verificar si un cupón es válido', async () => {
        const mockCouponRows = [{ id: 1, codigo: 'TESTCODE', descuento: 10, fecha_expiracion: '2023-12-31' }];
        const mockUsageRows = [];

        pool.query = jest.fn()
            .mockResolvedValueOnce([mockCouponRows])
            .mockResolvedValueOnce([mockUsageRows]);

        const response = await request(app)
            .post('/coupons/verify')
            .send({ codigo: 'TESTCODE', usuario_id: 1 });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Cupón válido');
        expect(response.body).toHaveProperty('cupon', mockCouponRows[0]);
    });

    // Test para manejar errores al crear un cupón
    it('Debería manejar errores al crear un cupón', async () => {
        pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

        const response = await request(app)
            .post('/coupons')
            .send({ codigo: 'TESTCODE', descuento: 10, fecha_expiracion: '2023-12-31' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error al crear el cupón');
    });

    // Test para manejar errores al editar un cupón
    it('Debería manejar errores al editar un cupón', async () => {
        pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

        const response = await request(app)
            .put('/coupons/1')
            .send({ codigo: 'NEWCODE', descuento: 15, fecha_expiracion: '2023-12-31' });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error al actualizar el cupón');
    });

    // Test para manejar errores al eliminar un cupón
    it('Debería manejar errores al eliminar un cupón', async () => {
        pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

        const response = await request(app)
            .delete('/coupons/1');

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error al eliminar el cupón');
    });

    // Test para manejar errores al verificar un cupón
    it('Debería manejar errores al verificar un cupón', async () => {
        pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

        const response = await request(app)
            .post('/coupons/verify')
            .send({ codigo: 'TESTCODE', usuario_id: 1 });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Error al verificar el cupón');
    });
});