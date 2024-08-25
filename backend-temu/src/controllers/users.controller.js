import { pool } from '../db.js';
import bcrypt from 'bcrypt';

export const createUser = async(req, res) => {
    const { email, password } = req.body;
    const username = email.split('@')[0];
    
    try {

        // Encriptar la contraseña
        const saltRounds = 10;
        const passwordHashed = await bcrypt.hash(password, saltRounds);

        // Guardar el usuario en la base de datos
        const [rows] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, passwordHashed]);
        res.send({
            id: rows.insertId,
            username: username,
            email,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const user = rows[0];

        // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas, responder con un mensaje de éxito
        res.send({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            // Puedes incluir un token JWT aquí si estás utilizando autenticación basada en tokens
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}