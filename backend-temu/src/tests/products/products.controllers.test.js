import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { getProductos, getProductoById, marcarFavorito, obtenerFavoritos } from '../../controllers/products.controller.js'; // Ajusta la ruta según tu estructura de proyecto
import { pool } from '../../db.js'; // Ajusta la ruta según tu estructura de proyecto

const app = express();
app.use(bodyParser.json());
app.get('/products', getProductos);
app.get('/products/:id', getProductoById);
app.post('/products/favoritos', marcarFavorito);
app.get('/products/favoritos/:usuario_id', obtenerFavoritos);

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

describe('Controladores de Productos', () => {
    describe('GET /products', () => {
        it('debería devolver una lista de productos con sus detalles', async () => {
            const response = await request(app)
                .get('/products');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            if (response.body.length > 0) {
                const product = response.body[0];
                expect(product).toHaveProperty('id');
                expect(product).toHaveProperty('descripcion');
                expect(product).toHaveProperty('proveedor_nombre');
                expect(product).toHaveProperty('categoria_nombre');
                expect(product).toHaveProperty('categoria_padre_nombre');
            }
        });

        it('debería manejar errores al obtener los productos', async () => {
            // Simula un error en la base de datos
            const originalQuery = pool.query;
            pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

            const response = await request(app)
                .get('/products');

            expect(response.status).toBe(500);
            expect(response.body.message).toBeDefined();

            // Restaura la original
            pool.query = originalQuery;
        });
    });

    describe('GET /products/:id', () => {
        it('debería devolver los detalles de un producto específico', async () => {
            const response = await request(app)
                .get('/products/1');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('descripcion');
            expect(response.body).toHaveProperty('proveedor_nombre');
            expect(response.body).toHaveProperty('categoria_nombre');
            expect(response.body).toHaveProperty('categoria_padre_nombre');
        });

        it('debería manejar errores al obtener los detalles del producto', async () => {
            // Simula un error en la base de datos
            const originalQuery = pool.query;
            pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

            const response = await request(app)
                .get('/products/1');

            expect(response.status).toBe(500);
            expect(response.body.message).toBeDefined();

            // Restaura la original
            pool.query = originalQuery;
        });

        it('debería devolver 404 si el producto no se encuentra', async () => {
            const response = await request(app)
                .get('/products/9999'); // ID de producto que no existe
    
            expect(response.status).toBe(404);
            expect(response.body.message).toBeDefined();
        });
    });

    describe('POST /products/favoritos', () => {
        it('debería marcar un producto como favorito', async () => {
            const response = await request(app)
                .post('/products/favoritos')
                .send({ usuario_id: 1, producto_id: 1 });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Fecha de favorito actualizada');
        });

        it('debería manejar errores al marcar un producto como favorito', async () => {
            const response = await request(app)
                .post('/products/favoritos')
                .send({ usuario_id: 1, producto_id: null });

            expect(response.status).toBe(404);
            expect(response.body.message).toBeDefined();
        });
    });

    describe('GET /products/favoritos/:usuario_id', () => {
        it('debería devolver los productos favoritos de un usuario', async () => {
            const response = await request(app)
                .get('/products/favoritos/1');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('debería manejar errores al obtener los productos favoritos', async () => {
            const response = await request(app)
                .get('/products/favoritos/9999'); // ID de usuario que no existe

            expect(response.status).toBe(404);
            expect(response.body.message).toBeDefined();
        });
    });
});