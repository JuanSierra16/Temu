import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const fetchOrders = async userId => {
    try {
        const response = await axios.get(
            `${baseURL}/usuarios/${userId}/pedidos`,
        );

        return response.data || [];
    } catch (error) {
        return [];
    }
};

export const cancelOrder = async orderId => {
    try {
        const response = await axios.put(
            `${baseURL}/pedidos/${orderId}/estado`,
            { estado: 'Cancelado' },
        );

        return response.status === 200;
    } catch (error) {
        return false;
    }
};
