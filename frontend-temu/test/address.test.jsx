import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { TestUserProvider } from './TestComponent.jsx';
import axios from 'axios';
import Address from '../src/pages/user/Address.jsx';
import {
    addAddress,
    deleteAddress,
    getAddresses,
    updateAddress,
} from '../src/API/Address.API.js';

vi.mock('axios');

describe('Direcciones de entrega', () => {
    beforeEach(() => {
        axios.get.mockReset();
        axios.post.mockReset();
        axios.put.mockReset();
        axios.delete.mockReset();
    });

    const address = {
        id: 1,
        pais: 'Colombia',
        nombre: 'Test',
        apellido: 'Test',
        telefono: '+51 321321321',
        departamento: 'Risaralda',
        municipio: 'Pereira',
        codigo_postal: '66000',
        numero_direccion: '30',
        informacion_adicional: 'Dejar en la puerta',
    };

    test('Axios addresses', async () => {
        axios.get.mockResolvedValue({
            data: [address],
        });

        axios.post.mockResolvedValue({
            data: address,
        });

        axios.put.mockResolvedValue({
            status: 200,
        });

        axios.delete.mockResolvedValue({
            status: 200,
        });

        let res = await getAddresses(1);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(res[0]).toEqual(address);

        res = await addAddress(1, address);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(res).toEqual(address.id);

        res = await updateAddress(address);
        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(res).toEqual(true);

        res = await deleteAddress(1, address.id);
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(res).toEqual(true);
    });

    test('Vista de direcciones y formulario', async () => {
        axios.get.mockResolvedValue({
            data: [address],
        });

        render(<Address />, {
            wrapper: TestUserProvider,
        });

        fireEvent.click(screen.getByRole('button', { name: /Agregar*/i }));

        const name = screen.getByRole('textbox', {
            name: /Nombre/i,
        });
        const lastName = screen.getByRole('textbox', {
            name: /Apellido/i,
        });

        expect(name).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();

        fireEvent.change(name, { target: { value: 'Test' } });
        fireEvent.change(lastName, { target: { value: 'Test' } });

        expect(name).toHaveValue('Test');
        expect(lastName).toHaveValue('Test');
    });
});
