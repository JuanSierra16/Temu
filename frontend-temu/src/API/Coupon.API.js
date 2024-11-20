import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export const verifyCoupon = async (userId, code) => {
    try {
        const response = await axios.post(`${baseURL}/coupons/verify`, {
            codigo: code,
            usuario_id: userId,
        });

        return {
            id: response.data.cupon.id || null,
            isValid:
                response.status === 200 && response.data.cupon.descuento > 0,
            message: response.data.message,
            discount: parseFloat(response.data.cupon.descuento || 0),
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
