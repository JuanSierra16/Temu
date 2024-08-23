import express from 'express';
import usersRoutes from './routes/users.routes.js';

const app = express();

app.use(usersRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});