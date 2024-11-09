import axios from 'axios';

const baseUlr = 'http://localhost:3000';

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

export const deleteAddress = async addressId => {
    try {
        const res = await axios.delete(
            `${baseUlr}/shipping-addresses/${addressId}`,
        );
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
