import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const verifyCoupon = async (userId, code) => {
    try {
        const response = await axios.get(`${baseURL}/coupons/verify`, {
            params: {
                codigo: code,
                usuario_id: userId,
            },
        });

        return {
            isValid: response.status === 200,
            message: response.data.message,
            discount: parseFloat(response.data.descuento),
        };
    } catch (error) {
        return {
            isValid: false,
            message: 'Error al verificar el cupón',
            discount: 0,
        };
    }
};
