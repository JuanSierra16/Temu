import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TestUserProvider } from './TestComponent.jsx';
import { fetchReviews } from '../src/API/Products.API.js';
import Product from '../src/pages/Product.jsx';
import axios from 'axios';

vi.mock('axios');

describe('Reseñas de productos', () => {
    beforeEach(() => {
        axios.get.mockReset();
    });

    const product = {
        id: 1,
        descripcion: 'Protector de colchón ',
        precio_con_descuento: 85.481,
        precio: 122.229,
        imagenes: ['1pc Protector de colchón imper.webp'],
        atributos: {
            Color: ['Oscuro', 'Azul'],
            'Modelo compatible': ['iPhone 11'],
        },
    };

    const review = {
        calificacion: 5,
        comentario: 'Excelente producto, excelente calidad y precio.',
    };

    test('Axios reseñas', async () => {
        axios.get.mockResolvedValue({
            data: [review],
        });

        const res = await fetchReviews(1);
        const expectedUrlPath = '/products/1/reviews';

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get.mock.calls[0][0].endsWith(expectedUrlPath)).toBe(true);

        expect(res).toEqual([review]);
    });

    test('Obtener y mostrar reseñas', async () => {
        axios.get.mockResolvedValue({
            data: [review],
        });

        render(<Product />, {
            wrapper: TestUserProvider,
        });

        await waitFor(async () => {
            expect(
                screen.getByText(review.comentario, { exact: false }),
            ).toBeInTheDocument();
        });
    });
});
