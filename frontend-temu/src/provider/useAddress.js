import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import {
    addAddress,
    deleteAddress,
    getAddresses,
    updateAddress,
} from '../API/Address.API';

export const useAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [errorAddress, setErrorAddress] = useState('');
    const { userData } = useContext(UserContext);

    useEffect(() => {
        if (userData) {
            getAddresses(userData.id).then(res => {
                setAddresses(res);
            });
        }
    }, [userData]);

    const _addAddress = async address => {
        try {
            const res = await addAddress(userData.id, address);

            if (!res) {
                setErrorAddress('Error al guardar la dirección');
            } else {
                const data = { id: res, ...address };
                setAddresses([data, ...addresses]);
                return true;
            }

            return true;
        } catch (error) {
            setErrorAddress('Error al guardar la dirección');
        }

        return false;
    };

    const _updateAddress = async address => {
        try {
            const res = await updateAddress(address);

            if (!res) {
                setErrorAddress('Error al guardar la dirección');
            } else {
                const newAddress = addresses.map(item => {
                    if (item.id === address.id) {
                        return address;
                    }

                    return item;
                });

                setAddresses(newAddress);
                return true;
            }
        } catch (error) {
            setErrorAddress('Error al guardar la dirección');
        }

        return false;
    };

    const _deleteAddress = async address => {
        const res = await deleteAddress(userData.id, address.id);

        if (!res) {
            setErrorAddress('Error al remover la dirección');
        } else {
            setAddresses(addresses.filter(item => item.id !== address.id));
            return true;
        }

        return false;
    };

    return {
        addresses,
        errorAddress,
        addAddress: _addAddress,
        updateAddress: _updateAddress,
        deleteAddress: _deleteAddress,
    };
};
