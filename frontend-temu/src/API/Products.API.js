import { products } from '../utils/products';

let currentIndex = 0;

export const getProducts = async () => {
    // test utils/products.js
    // Obtener de a 5 productos
    const data = products.slice(currentIndex, currentIndex + 5);
    currentIndex += 5;

    return data;
};
