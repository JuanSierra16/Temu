import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
    act,
    render,
    renderHook,
    screen,
    waitFor,
} from '@testing-library/react';
import { useContext } from 'react';
import { ProductsContext } from '../src/provider/ProductsContext.jsx';
import { TestComponent, TestProductsProvider } from './TestComponent.jsx';
import DeskNavBar from '../src/components/sections/navbar/DeskNavBar.jsx';

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

    test('Navbar buscador', async () => {
        render(<DeskNavBar />, {
            wrapper: TestComponent,
        });

        await waitFor(async () => {
            const input = screen.getByPlaceholderText('Buscar');
            expect(input).toBeInTheDocument();
        });
    });

    test('Buscar producto por nombre', async () => {
        render(<DeskNavBar />, {
            wrapper: TestComponent,
        });

        const { result } = renderHook(() => useContext(ProductsContext), {
            wrapper: TestComponent,
        });

        await waitFor(async () => {
            const input = screen.getByPlaceholderText('Buscar');
            expect(input).toBeInTheDocument();
        });

        await act(async () => {
            expect(result.current.products.length).toBe(2);
        });

        await act(async () => {
            await result.current.findByCategoryOrName('colchón');
        });

        await act(async () => {
            expect(result.current.products.length).toBe(1);
        });
    });
});
