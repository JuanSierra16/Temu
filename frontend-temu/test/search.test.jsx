import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useContext } from 'react';
import { ProductsContext } from '../src/provider/ProductsContext.jsx';
import { TestComponent } from './TestComponent.jsx';
import axios from 'axios';

// vi.mock('axios');

describe('Búsqueda avanzada', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mocks = vi.hoisted(() => ({
        get: vi.fn(url => {
            switch (url) {
                case '/products':
                    return Promise.resolve({
                        data: [
                            {
                                id: 1,
                                descripcion: 'Protector de colchón ',
                                precio_con_descuento: 85.481,
                                precio: 122.229,
                                imagenes: [
                                    '1pc Protector de colchón imper.webp',
                                ],
                            },
                            {
                                descripcion: '2 set Gorro De Satén',
                                precio_con_descuento: 4.757,
                                precio: 28.629,
                                imagenes: [
                                    '2 Unids_set Gorro De Satén De .webp',
                                ],
                            },
                        ],
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

    test('Buscar producto por nombre', async () => {
        // axios.get.mockResolvedValue({
        //     data: [
        //         {
        //             id: 1,
        //             descripcion: 'Protector de colchón ',
        //             precio_con_descuento: 85.481,
        //             precio: 122.229,
        //             imagenes: ['1pc Protector de colchón imper.webp'],
        //         },
        //         {
        //             descripcion: '2 set Gorro De Satén',
        //             precio_con_descuento: 4.757,
        //             precio: 28.629,
        //             imagenes: ['2 Unids_set Gorro De Satén De .webp'],
        //         },
        //     ],
        // });

        const { result } = renderHook(() =>
            useContext(ProductsContext, {
                wrapper: ProductsContext.Provider,
            }),
        );

        await act(async () => {
            expect(result.current.products.length).toBe(2);
        });
    });
});
