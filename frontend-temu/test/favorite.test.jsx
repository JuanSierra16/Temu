import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TestUserProvider } from './TestComponent.jsx';
import axios from 'axios';
import Favorite from '../src/pages/user/Favorite.jsx';
import { getFavoriteProducts } from '../src/API/Products.API.js';

vi.mock('axios');

describe('Productos favoritos', () => {
    beforeEach(() => {
        axios.get.mockReset();
    });

    const products = [
        {
            id: 1,
            descripcion: 'Protector de colchón ',
            precio_con_descuento: 85.481,
            precio: 122.229,
            imagenes: ['1pc Protector de colchón imper.webp'],
            atributos: {
                Color: ['Oscuro', 'Azul'],
                'Modelo compatible': ['iPhone 11'],
            },
        },
    ];

    test('Axios favoritos', async () => {
        axios.get.mockResolvedValue({
            data: products,
        });

        const res = await getFavoriteProducts(1);
        const expectedUrlPath = '/products/favoritos/1';

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get.mock.calls[0][0].endsWith(expectedUrlPath)).toBe(true);

        expect(res).toEqual(products);
    });

    test('Vista de favoritos', async () => {
        axios.get.mockResolvedValue({
            data: products,
        });

        render(<Favorite />, {
            wrapper: TestUserProvider,
        });

        await waitFor(async () => {
            expect(
                screen.getByText('Protector de colchón'),
            ).toBeInTheDocument();
        });
    });

    test('Error al obtener favoritos', async () => {
        render(<Favorite />, {
            wrapper: TestUserProvider,
        });

        await waitFor(async () => {
            expect(
                screen.getByText('No se encontraron artículos favoritos'),
            ).toBeInTheDocument();
        });
    });
});
