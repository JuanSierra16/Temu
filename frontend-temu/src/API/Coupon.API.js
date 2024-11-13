import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const verifyCoupon = async (userId, code) => {
    try {
        const response = await axios.post(`${baseURL}/coupons/verify`, {
            params: {
                codigo: code,
                usuario_id: userId,
            },
        });

        return {
            id: response.data.id || null,
            isValid: response.status === 200 && response.data.descuento > 0,
            message: response.data.message,
            discount: parseFloat(response.data.descuento || 0),
        };
    } catch (error) {
        return {
            id: null,
            isValid: false,
            message: 'Error al verificar el cupón',
            discount: 0,
        };
    }
};
