import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export const makePayment = async paymentData => {
    try {
        const response = await axios.post(
            `${baseURL}/create-checkout-session`,
            paymentData,
        );

        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
