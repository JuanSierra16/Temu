import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const API = axios.create({
    baseURL: baseURL,
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

export const loginHasProfile = async email => {
    const response = await API.post('/users/login/has-profile', {
        email,
    });

    return response.data;
};

export const loginSendEmailCode = async email => {
    const response = await API.post('/users/send-verificaction-code', {
        email,
    });

    return response.data;
};

export const loginResetPassword = async (email, newPassword) => {
    const response = await API.post('/users/update-password', {
        email,
        newPassword,
    });

    return response.data;
};

export const sendVerificationCodeSMS = async phoneNumber => {
    const response = await API.post('/users/send-verification-code-sms', {
        phoneNumber,
    });

    return response.data;
};

export const loginWithPhoneNumber = async phoneNumber => {
    const response = await API.post('/users/login-with-phone', {
        phoneNumber,
    });

    return response.data;
};

export const findAccountByEmail = async email => {
    const response = await API.post('/users/find-by-email', {
        email,
    });

    return response;
};

export const findAccountByPhoneNumber = async phoneNumber => {
    const response = await API.post('/users/find-by-phone', {
        phoneNumber,
    });

    return response;
};

export const updateUserDetails = async (
    id,
    username,
    medida_pecho,
    medida_cintura,
    medida_cadera,
    estatura,
    peso,
    unidad_medida,
) => {
    const response = await axios.put(`${baseURL}/users/${id}/details`, {
        username,
        medida_pecho,
        medida_cintura,
        medida_cadera,
        estatura,
        peso,
        unidad_medida,
    });

    return response.status === 200;
};
