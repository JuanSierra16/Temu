import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'erdggfdjhe23';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const username = email.split('@')[0];

    try {
        // Buscar el usuario en la base de datos
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            // Si el usuario no existe, crear un nuevo usuario
            const saltRounds = 10;
            const passwordHashed = await bcrypt.hash(password, saltRounds);

            const [insertResult] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, passwordHashed]);

             // Generar el token JWT
             const token = jwt.sign({ id: insertResult.insertId, username, email }, SECRET_KEY, { expiresIn: '1h' });

            return res.send({
                message: 'Usuario creado y sesión iniciada',
                user: {
                    id: insertResult.insertId,
                    username: username,
                    email,
                },
                token: token, // Devolver el token al front-end
            });
        }

        const user = rows[0];

        // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        // Si las credenciales son correctas, responder con un mensaje de éxito
        res.send({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token: token, // Devolver el token al front-end
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const loginUserPlatform = async (req, res) => {
    const { id_usuario_plataforma, nombre_plataforma, username, email } = req.body;

    try {
        // Buscar si el usuario ya existe en la base de datos
        const [rows] = await pool.query('SELECT * FROM users WHERE id_usuario_plataforma = ?', [id_usuario_plataforma]);

        let user;
        if (rows.length === 0) {
            // Si el usuario no existe, crear un nuevo usuario
            const [insertResult] = await pool.query('INSERT INTO users (id_usuario_plataforma, nombre_plataforma, username, email) VALUES (?, ?, ?, ?)', [id_usuario_plataforma, nombre_plataforma, username, email]);
            user = {
                id: insertResult.insertId,
                id_usuario_plataforma,
                nombre_plataforma,
                username,
                email
            };
        } else {
            // Si el usuario ya existe, obtener sus datos
            user = rows[0];
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        // Devolver el ID del usuario y el token al front-end
        res.send({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user.id,
                id_usuario_plataforma: user.id_usuario_plataforma,
                nombre_plataforma: user.nombre_plataforma,
                username: user.username,
                email: user.email,
            },
            token: token, // Devolver el token al front-end
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};