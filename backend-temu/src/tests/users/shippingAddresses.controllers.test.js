import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { createShippingAddress, getShippingAddresses, updateShippingAddress, deleteShippingAddress } from './../../controllers/shippingAddresses.controller.js';
import { pool } from '../../db.js';

const app = express();
app.use(bodyParser.json());
app.post('/shipping-addresses', createShippingAddress);
app.get('/shipping-addresses/:usuario_id', getShippingAddresses);
app.put('/shipping-addresses/:id', updateShippingAddress);
app.delete('/shipping-addresses', deleteShippingAddress);

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

describe('Controladores de Direcciones de Envío', () => {
    describe('GET /shipping-addresses/:usuario_id', () => {
        it('debería obtener las direcciones de envío de un usuario', async () => {
            // Simula la obtención de direcciones de envío
            const originalQuery = pool.query;
            pool.query = jest.fn().mockResolvedValueOnce([[{ id: 1, usuario_id: 1, pais: 'México', nombre: 'Juan', apellido: 'Pérez', telefono: '1234567890', departamento: 'CDMX', municipio: 'Benito Juárez', codigo_postal: '12345', numero_direccion: 'Calle Falsa 123', informacion_adicional: 'Departamento 4B' }]]);

            const response = await request(app)
                .get('/shipping-addresses/1');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);

            // Restaura la implementación original
            pool.query = originalQuery;
        });

        it('debería manejar errores al obtener las direcciones de envío', async () => {
            // Simula un error en la base de datos
            const originalQuery = pool.query;
            pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

            const response = await request(app)
                .get('/shipping-addresses/1');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error al obtener las direcciones de envío');

            // Restaura la implementación original
            pool.query = originalQuery;
        });
    });

    describe('PUT /shipping-addresses/:id', () => {
        it('debería actualizar una dirección de envío', async () => {
            // Simula la actualización de la dirección de envío
            const originalQuery = pool.query;
            pool.query = jest.fn().mockResolvedValueOnce({});

            const response = await request(app)
                .put('/shipping-addresses/1')
                .send({
                    pais: 'México',
                    nombre: 'Juan',
                    apellido: 'Pérez',
                    telefono: '1234567890',
                    departamento: 'CDMX',
                    municipio: 'Benito Juárez',
                    codigo_postal: '12345',
                    numero_direccion: 'Calle Falsa 123',
                    informacion_adicional: 'Departamento 4B'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Dirección de envío actualizada exitosamente');

            // Restaura la implementación original
            pool.query = originalQuery;
        });

        it('debería manejar errores al actualizar una dirección de envío', async () => {
            // Simula un error en la base de datos
            const originalQuery = pool.query;
            pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

            const response = await request(app)
                .put('/shipping-addresses/1')
                .send({
                    pais: 'México',
                    nombre: 'Juan',
                    apellido: 'Pérez',
                    telefono: '1234567890',
                    departamento: 'CDMX',
                    municipio: 'Benito Juárez',
                    codigo_postal: '12345',
                    numero_direccion: 'Calle Falsa 123',
                    informacion_adicional: 'Departamento 4B'
                });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error al actualizar la dirección de envío');

            // Restaura la implementación original
            pool.query = originalQuery;
        });
    });
});