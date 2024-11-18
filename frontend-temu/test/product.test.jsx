import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { TestComponentInitial } from './TestComponent.jsx';
import Product from '../src/pages/Product.jsx';

describe('Disponibilidad de productos', () => {
    beforeEach(() => {});

    const mocks = vi.hoisted(() => ({
        get: vi.fn(url => {
            console.log('url', url);
            switch (url) {
                case '/products':
                    return Promise.resolve({
                        data: [],
                    });
                case '/products/undefined':
                    return Promise.resolve({
                        data: {
                            id: 1,
                            descripcion: 'Protector de colchón ',
                            precio_con_descuento: 85.481,
                            precio: 122.229,
                            stock: 10,
                            imagenes: ['1pc Protector de colchón imper.webp'],
                            atributos: {
                                Color: ['Oscuro', 'Azul'],
                                'Modelo compatible': ['iPhone 11'],
                            },
                        },
                    });
            }
        }),
    }));

    vi.mock('axios', async importActual => {
        const actual = await importActual('axios');

        return {
            default: {
                ...actual.default,
                create: vi.fn(() => ({
                    ...actual.default.create(),
                    get: mocks.get,
                })),
            },
        };
    });

    test('Pocas unidades', async () => {
        render(
            <TestComponentInitial
                initialRoute={'/product/1'}
                productPrompts={{ clearFilter: vi.fn() }}
            >
                <Product />
            </TestComponentInitial>,
        );

        await waitFor(async () => {
            expect(mocks.get.mock.lastCall[0]).toBe('/products/undefined');

            const msg = screen.getByText('Pocas unidades disponibles.', {
                exact: false,
            });

            expect(msg).toBeInTheDocument();
        });
    });
});
