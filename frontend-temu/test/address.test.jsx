import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
    act,
    fireEvent,
    render,
    renderHook,
    screen,
    waitFor,
} from '@testing-library/react';
import { TestUserProvider } from './TestComponent.jsx';
import axios from 'axios';
import Address from '../src/pages/user/Address.jsx';
import {
    addAddress,
    deleteAddress,
    getAddresses,
    updateAddress,
} from '../src/API/Address.API.js';
import { useAddress } from '../src/provider/useAddress.js';

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

    test('Vista de direcciones get API', async () => {
        axios.get.mockResolvedValue({
            data: [address],
        });

        render(<Address />, {
            wrapper: TestUserProvider,
        });

        await waitFor(async () => {
            expect(screen.getByText('Colombia')).toBeInTheDocument();
        });
    });

    test('Vista de direcciones Error API', async () => {
        axios.get.mockResolvedValue({
            data: [address],
        });

        axios.delete.mockResolvedValue({
            status: 404,
        });

        render(<Address />, {
            wrapper: TestUserProvider,
        });

        await waitFor(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Eliminar*/i }));
        });

        expect(
            screen.getByText('Error al remover la dirección'),
        ).toBeInTheDocument();
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

    test('useAddress get', async () => {
        axios.get.mockResolvedValue({
            data: [address],
        });

        const { result } = renderHook(() => useAddress(), {
            wrapper: TestUserProvider,
        });

        await waitFor(async () => {
            expect(result.current.addresses).toEqual([address]);
        });
    });

    test('useAddress add', async () => {
        const { result } = renderHook(() => useAddress(), {
            wrapper: TestUserProvider,
        });

        axios.post.mockResolvedValue({
            data: { id: 2 },
        });

        const newAddress = {
            ...address,
        };

        await act(async () => {
            await result.current.addAddress(newAddress);
        });

        await act(async () => {
            expect(result.current.addresses.length).toBe(1);
            expect(result.current.addresses[0]).toEqual({
                id: 2,
                ...address,
            });
        });
    });

    test('useAddress update', async () => {
        axios.get.mockResolvedValue({
            data: [address],
        });

        axios.put.mockResolvedValue({
            status: 200,
        });

        const { result } = renderHook(() => useAddress(), {
            wrapper: TestUserProvider,
        });

        // esperar a que se carguen las direcciones
        await waitFor(async () => {
            expect(result.current.addresses.length).toBe(1);
        });

        const newAddress = {
            ...address,
            nombre: 'Test 2',
        };

        await act(async () => {
            const res = await result.current.updateAddress(newAddress);
            expect(res).toBe(true);
        });

        await waitFor(async () => {
            expect(result.current.addresses.length).toBe(1);
            expect(result.current.addresses[0]).toEqual({
                ...address,
                nombre: 'Test 2',
            });
        });
    });

    test('useAddress delete', async () => {
        axios.get.mockResolvedValue({
            data: [address],
        });

        axios.delete.mockResolvedValue({
            status: 200,
        });

        const { result } = renderHook(() => useAddress(), {
            wrapper: TestUserProvider,
        });

        // esperar a que se carguen las direcciones
        await waitFor(async () => {
            expect(result.current.addresses.length).toBe(1);
        });

        const newAddress = {
            ...address,
            nombre: 'Test 2',
        };

        await act(async () => {
            const res = await result.current.deleteAddress(newAddress);
            expect(res).toBe(true);
        });

        await waitFor(async () => {
            expect(result.current.addresses.length).toBe(0);
        });
    });
});
