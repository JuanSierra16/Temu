import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
    act,
    render,
    screen,
    renderHook,
    fireEvent,
    waitFor,
} from '@testing-library/react';
import { TestComponent, TestProductsProvider } from './TestComponent.jsx';
import { useCountry } from '../src/provider/UseCountry.js';
import SetCountry from '../src/pages/SetCountry.jsx';
import ProductGrid from '../src/components/sections/ProductGrid.jsx';

describe('Moneda de compra', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const products = [
        {
            id: 1,
            descripcion: 'Protector de colchón ',
            precio_con_descuento: 85.481,
            precio: 122.229,
            imagenes: ['1pc Protector de colchón imper.webp'],
        },
    ];

    vi.spyOn(window, 'fetch').mockImplementation(
        vi.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        date: '2024-11-10',
                        eur: {
                            cop: 4000,
                        },
                    }),
            }),
        ),
    );

    test('Moneda por defecto', async () => {
        const { result } = renderHook(() => useCountry());

        await act(async () => {
            expect(result.current.currency.acronym).toBe('EUR');
        });
    });

    test('Cambiar Moneda a COP', async () => {
        const { result } = renderHook(() => useCountry());

        await act(async () => {
            result.current.setCurrencyByCode('COP');
        });

        await act(async () => {
            expect(result.current.currency.acronym).toBe('COP');
            expect(result.current.currency.exchangeRate).toBe(4000);
        });
    });

    test('Vista de cambio de moneda', async () => {
        const { result } = renderHook(() => useCountry());

        render(<SetCountry />, {
            wrapper: TestComponent,
        });

        await waitFor(async () => {
            expect(screen.getByText('EUR : €')).toBeInTheDocument();
        });

        result.current.setCurrencyByCode('COP');
        expect(screen.getByText('COP : $')).toBeInTheDocument();
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

    test('Vista de productos con COP', async () => {
        const { result } = renderHook(() => useCountry());

        await act(async () => {
            result.current.setCurrencyByCode('COP');
        });

        render(
            <TestProductsProvider products={products}>
                <ProductGrid />
            </TestProductsProvider>,
        );

        await waitFor(async () => {
            expect(
                screen.getByText('COP 341,924.00', { exact: false }),
            ).toBeInTheDocument();
        });
    });
});
