import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
});

export const login = async (email, password) => {
    const response = await API.post('/users/login', { email, password });
    return response.data;
};

export const loginWithPlatform = async (
    id_usuario_plataforma,
    nombre_plataforma,
    username,
    email,
) => {
    const response = await API.post('/users/login/platform', {
        id_usuario_plataforma,
        nombre_plataforma,
        username,
        email,
    });

    return response.data;
};
