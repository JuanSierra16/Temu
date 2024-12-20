import axios from 'axios';

const baseUlr = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export const addAddress = async (userId, address) => {
    try {
        const res = await axios.post(`${baseUlr}/shipping-addresses`, {
            usuario_id: userId,
            ...address,
        });

        return res.data.id;
    } catch (error) {
        return null;
    }
};

export const getAddresses = async userId => {
    try {
        const res = await axios.get(`${baseUlr}/shipping-addresses/${userId}`);
        return res.data;
    } catch (error) {
        return [];
    }
};

export const deleteAddress = async (userId, addressId) => {
    try {
        const res = await axios.delete(`${baseUlr}/shipping-addresses`, {
            data: {
                id: addressId,
                usuario_id: userId,
            },
        });

        return res.status === 200;
    } catch (error) {
        return false;
    }
};

export const updateAddress = async address => {
    try {
        const res = await axios.put(
            `${baseUlr}/shipping-addresses/${address.id}`,
            {
                ...address,
            },
        );

        return res.status === 200;
    } catch (error) {
        return false;
    }
};
