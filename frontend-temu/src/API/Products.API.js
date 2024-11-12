import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
});

const baseURL = 'http://localhost:3000';

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

export const addFavoriteProduct = async (userId, productId) => {
    try {
        const response = await axios.post(`${baseURL}/products/favoritos`, {
            usuario_id: userId,
            producto_id: productId,
        });

        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export const getFavoriteProducts = async userId => {
    const response = await axios.get(`${baseURL}/products/favoritos/${userId}`);
    return response.data;
};

export const deleteFavoriteProduct = async (userId, productId) => {
    try {
        const response = await axios.delete(
            `${baseURL}/favoritos/${userId}/${productId}`,
        );

        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export const addReviewProduct = async (productId, reviewText, rating, userId) => {
    try {
        const response = await axios.post(`${baseURL}/products/reviews`, {
            producto_id: productId,
            texto: reviewText,
            calificacion: rating,
            usuario_id: userId,
        });

        return response.status === 200;
    } catch (error) {
        return false;
    }
};
