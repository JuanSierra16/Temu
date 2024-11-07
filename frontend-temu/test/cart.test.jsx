import { describe, expect, test } from 'vitest';
import { act, render, screen, renderHook } from '@testing-library/react';
import { useContext } from 'react';
import { CartContext } from '../src/provider/CartContext.jsx';
import { TestCartProvider, TestComponent } from './TestComponent.jsx';
import Cart from '../src/pages/Cart.jsx';

describe('Cart', () => {
    const products = [
        {
            id: 1,
            descripcion: 'Protector de colchón ',
            precio_con_descuento: 85.481,
            precio: 122.229,
            imagenes: ['1pc Protector de colchón imper.webp'],
        },
        {
            id: 2,
            descripcion: '2 set Gorro De Satén',
            precio_con_descuento: 4.757,
            precio: 28.629,
            imagenes: ['2 Unids_set Gorro De Satén De .webp'],
        },
    ];

    test('Agregar al carrito', async () => {
        const { result } = renderHook(() => useContext(CartContext), {
            wrapper: TestCartProvider,
        });

        await act(async () => {
            await result.current.addCart(products[0]);
        });

        await act(async () => {
            await result.current.addCart(products[1]);
        });

        await act(async () => {
            expect(result.current.cartTotalCost).toBeCloseTo(85.481 + 4.757);
        });
    });

    test('Modificar cantidad de un producto en el carrito', async () => {
        const { result } = renderHook(() => useContext(CartContext), {
            wrapper: TestComponent,
        });

        await act(async () => {
            await result.current.addCart(products[0]);
        });

        await act(async () => {
            await result.current.setQuantity(products[0], 2);
        });
    });

    test('Eliminar del carrito', async () => {
        const { result } = renderHook(() => useContext(CartContext), {
            wrapper: TestCartProvider,
        });

        await act(async () => {
            await result.current.addCart(products[0]);
        });

        await act(async () => {
            await result.current.removeCart(products[1]); // no existe en el carrito
        });

        await act(async () => {
            expect(result.current.cart.length).toBe(1);
            await result.current.removeCart(products[0]);
        });

        expect(result.current.cart.length).toBe(0);
        expect(result.current.cartTotalCost).toBeCloseTo(0);
    });

    test('Vista de carrito de compras', async () => {
        const { result } = renderHook(() => useContext(CartContext), {
            wrapper: TestComponent,
        });

        await act(async () => {
            await result.current.addCart(products[0]);
        });

        render(<Cart />, {
            wrapper: TestComponent, // Envolver component en el context y provider
        });

        await act(async () => {
            const total = await screen.findByText('Total (1 artículos)');
            expect(total).toBeInTheDocument();
        });

        await act(async () => {
            await result.current.removeCart(products[0]);
        });
    });
});
