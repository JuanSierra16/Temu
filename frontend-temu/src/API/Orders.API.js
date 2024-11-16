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
