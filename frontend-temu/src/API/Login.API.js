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
