import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TestUserContext } from './TestComponent.jsx';
import { cancelOrder, fetchOrders } from '../src/API/Orders.API.js';
import YourOrders from '../src/pages/user/YourOrders.jsx';
import axios from 'axios';

vi.mock('axios');

describe('Historial de pedidos', () => {
    beforeEach(() => {
        axios.get.mockReset();
        axios.put.mockReset();
    });

    const order = {
        id: 31,
        usuario_id: 9,
        fecha_pedido: '2024-11-13T10:23:20.000Z',
        total: '23.06',
        estado: 'procesando',
        cupon_id: null,
        direccion_envio_id: 8,
        detalles: [
            {
                id: 28,
                pedido_id: 31,
                producto_id: 39,
                cantidad: 1,
                precio: '2306.00',
            },
        ],
        envio: {
            id: 8,
            usuario_id: 9,
            pais: 'Colombia',
            nombre: 'Jose',
            apellido: 'Sanchez',
            telefono: '+57 321231312',
            departamento: 'Risaralda',
            municipio: 'Pereira',
            codigo_postal: '660004',
            numero_direccion: '30 #22',
            informacion_adicional: 'Dejar en la puerta',
            fecha_creacion: '2024-11-13T08:24:25.000Z',
        },
    };

    test('Axios pedidos', async () => {
        axios.get.mockResolvedValue({
            data: [order],
        });

        let res = await fetchOrders(1);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(res[0]).toEqual(order);
    });

    test('Vista de ordenes get API', async () => {
        axios.get.mockResolvedValue({
            data: [order],
        });

        render(<YourOrders />, {
            wrapper: TestUserContext,
        });

        await waitFor(async () => {
            expect(
                screen.getByText(order.estado, { exact: false }),
            ).toBeInTheDocument();
        });
    });

    test('Vista de direcciones y detalles', async () => {
        axios.get.mockResolvedValue({
            data: [order],
        });

        render(<YourOrders />, {
            wrapper: TestUserContext,
        });

        await waitFor(async () => {
            expect(
                screen.getByText('Ver detalles', { exact: false }),
            ).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /Ver detalles*/i }));

        expect(screen.getByText(/cantidad: 1/i)).toBeInTheDocument();
    });

    test('Axios cancelar pedidos', async () => {
        axios.put.mockResolvedValue({
            status: 200,
        });

        let res = await cancelOrder(1);
        expect(res).toBe(true);

        const url = '/pedidos/1/estado';
        expect(axios.put.mock.calls[0][0].endsWith(url)).toBe(true);
    });

    test('Vista de ordenes cancelados', async () => {
        const cancelOrder = {
            ...order,
            estado: 'Cancelado',
        };

        axios.get.mockResolvedValue({
            data: [cancelOrder],
        });

        render(<YourOrders />, {
            wrapper: TestUserContext,
        });

        await waitFor(async () => {
            expect(
                screen.getByText(order.estado, { exact: false }),
            ).toBeInTheDocument();
        });
    });

    test('Cancelar pedido', async () => {
        axios.get.mockResolvedValue({
            data: [order],
        });

        render(<YourOrders />, {
            wrapper: TestUserContext,
        });

        await waitFor(async () => {
            expect(
                screen.getByText('Ver detalles', { exact: false }),
            ).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('button', { name: /Ver detalles*/i }));

        fireEvent.click(
            screen.getByRole('button', { name: /Cancelar pedido*/i }),
        );

        expect(screen.getByText(/Cancelado/i)).toBeInTheDocument();
    });
});
