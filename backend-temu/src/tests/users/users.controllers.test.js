import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { sendVerificationCode, updatePassword, loginUser, loginUserPlatform, findAccountByEmail, updateUserDetails } from '../../controllers/users.controller.js'; // Ajusta la ruta según tu estructura de proyecto
import { pool } from '../../db.js'; // Ajusta la ruta según tu estructura de proyecto

const app = express();
app.use(bodyParser.json());
app.post('/users/send-verification-code', sendVerificationCode);
app.post('/users/update-password', updatePassword);
app.post('/users/login', loginUser);
app.post('/users/login-platform', loginUserPlatform);
app.post('/users/find-account-by-email', findAccountByEmail);
app.put('/users/:id', updateUserDetails);

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

describe('Controladores de Usuarios', () => {
    describe('POST /users/send-verification-code', () => {
        it('debería enviar un código de verificación por correo electrónico', async () => {
            // Simula el envío de correo electrónico
            nodemailer.createTransport = jest.fn().mockReturnValue({
                sendMail: jest.fn().mockResolvedValueOnce({})
            });

            const response = await request(app)
                .post('/users/send-verification-code')
                .send({ email: 'usuario@example.com' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Código de verificación enviado a tu correo electrónico');
            expect(response.body.code).toBeDefined();
        });
    });

    describe('POST /users/update-password', () => {
        it('debería actualizar la contraseña del usuario', async () => {
            // Simula la actualización de la contraseña
            const response = await request(app)
                .post('/users/update-password')
                .send({ email: 'juanjose.sierra@utp.edu.co', newPassword: 'hola1234' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Contraseña actualizada exitosamente');
            expect(response.body.token).toBeDefined();
        });

        it('debería manejar errores al actualizar la contraseña', async () => {
            // Simula un error en la actualización de la contraseña
            const originalQuery = pool.query;
            pool.query = jest.fn().mockRejectedValueOnce(new Error('Error de base de datos'));

            const response = await request(app)
                .post('/users/update-password')
                .send({ email: 'usuario@example.com', newPassword: 'nueva_contraseña' });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error de base de datos');

            // Restaura la original
            pool.query = originalQuery;
        });
    });

    describe('POST /users/login', () => {
        it('debería iniciar sesión un usuario con credenciales válidas', async () => {
            const response = await request(app)
                .post('/users/login')
                .send({ email: 'usuario@example.com', password: 'contraseña_correcta' });

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();

        });

        it('debería manejar errores al iniciar sesión con credenciales inválidas', async () => {
            const response = await request(app)
                .post('/users/login')
                .send({ email: 'usuario@example.com', password: 'contraseña_incorrecta' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Contraseña incorrecta');
        });
    });

    describe('POST /users/login-platform', () => {
        it('debería iniciar sesión un usuario de una plataforma con credenciales válidas', async () => {

            const response = await request(app)
                .post('/users/login-platform')
                .send({ id_usuario_plataforma: '100724321074727458518', nombre_plataforma: 'Google', email: 'juanjose.sierra@utp.edu.co', username: 'juanjose.sierra' });

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        });
    });

    describe('POST /users/find-account-by-email', () => {
        it('debería encontrar una cuenta por email', async () => {
            const response = await request(app)
                .post('/users/find-account-by-email')
                .send({ email: 'usuario@example.com' });

            expect(response.status).toBe(200);
        });

        it('debería manejar errores al no encontrar una cuenta por email', async () => {
            const response = await request(app)
                .post('/users/find-account-by-email')
                .send({ email: 'usuario_no_existente@example.com' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Usuario no encontrado');
        });
    });

    describe('PUT /users/:id', () => {
        it('debería actualizar los detalles del usuario', async () => {
            // Simula la actualización de los detalles del usuario
            const originalQuery = pool.query;
            pool.query = jest.fn()
                .mockResolvedValueOnce({}) // Simula START TRANSACTION
                .mockResolvedValueOnce({}) // Simula UPDATE users
                .mockResolvedValueOnce([{ length: 0 }]) // Simula SELECT * FROM medidas_usuario
                .mockResolvedValueOnce({}) // Simula INSERT INTO medidas_usuario
                .mockResolvedValueOnce({}); // Simula COMMIT

            const response = await request(app)
                .put('/users/46')
                .send({
                    username: 'nuevo_username',
                    medida_pecho: 100,
                    medida_cintura: 80,
                    medida_cadera: 90,
                    estatura: 175,
                    peso: 70,
                    unidad_medida: 'cm'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Detalles del usuario actualizados exitosamente');

            // Restaura la implementación original
            pool.query = originalQuery;
        });

        it('debería manejar errores al actualizar los detalles del usuario', async () => {
            // Simula un error en la actualización de los detalles del usuario
            const originalQuery = pool.query;
            pool.query = jest.fn()
                .mockResolvedValueOnce({}) // Simula START TRANSACTION
                .mockRejectedValueOnce(new Error('Error de base de datos')) // Simula un error en la actualización

            const response = await request(app)
                .put('/users/1')
                .send({
                    username: 'nuevo_username',
                    medida_pecho: 100,
                    medida_cintura: 80,
                    medida_cadera: 90,
                    estatura: 175,
                    peso: 70,
                    unidad_medida: 'cm'
                });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error de base de datos');

            // Restaura la implementación original
            pool.query = originalQuery;
        });
    });
});