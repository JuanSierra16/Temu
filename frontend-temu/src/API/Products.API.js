import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getProducts = async () => {
    try {
        const response = await API.get('/products');
        return response.data;
    } catch (error) {
        return [];
    }
};

export const getProductById = async id => {
    const response = await API.get(`/products/${id}`);
    return response.data;
};
