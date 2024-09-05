import jwt from 'jsonwebtoken';

const SECRET_KEY = 'erdggfdjhe23';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Si no hay token, no autorizado

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Si el token no es válido, prohibido

        req.user = user; // Guarda la información del usuario en la solicitud
        next(); // Pasa al siguiente middleware o ruta
    });
};