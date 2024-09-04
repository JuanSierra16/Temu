import express from 'express';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

import './config.js'

const app = express();

// Configurar CORS con opciones avanzadas
const corsOptions = {
    origin: '*', // URL de tu frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(usersRoutes);
app.use(authRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});