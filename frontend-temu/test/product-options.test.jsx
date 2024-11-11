import { beforeEach, describe, expect, test } from 'vitest';
import {
    act,
    render,
    screen,
    renderHook,
    fireEvent,
} from '@testing-library/react';
import { useContext } from 'react';
import { CartContext } from '../src/provider/CartContext.jsx';
import { TestCartProvider, TestComponent } from './TestComponent.jsx';
import Cart from '../src/pages/Cart.jsx';

describe('Opciones de un producto', () => {
    beforeEach(() => {
        localStorage.clear();
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

    const renderCartHook = async () => {
        const { result } = renderHook(() => useContext(CartContext), {
            wrapper: TestCartProvider,
        });

        await act(async () => {
            await result.current.addCart(product);
        });

        return result;
    };

    test('Atributos seleccionados', async () => {
        const result = await renderCartHook();

        expect(result.current.cart[0].atributos_seleccionados).toEqual({
            Color: 'Oscuro',
            'Modelo compatible': 'iPhone 11',
        });
    });

    test('Cambio de Atributos seleccionados', async () => {
        const result = await renderCartHook();

        await act(async () => {
            await result.current.setProductAttribute(product, 'Color', 'Azul');
        });

        expect(result.current.cart[0].atributos_seleccionados).toEqual({
            Color: 'Azul',
            'Modelo compatible': 'iPhone 11',
        });
    });

    test('NO se encuentra el atributo', async () => {
        const result = await renderCartHook();

        await act(async () => {
            await result.current.setProductAttribute(product, 'Tamaño', 'xl');
        });

        expect(result.current.cart[0].atributos_seleccionados).toEqual({
            Color: 'Oscuro',
            'Modelo compatible': 'iPhone 11',
        });
    });

    test('Vista de producto', async () => {
        const result = await renderCartHook();

        render(<Cart />, {
            wrapper: TestCartProvider,
        });

        expect(screen.getByText('Modelo compatible:')).toBeInTheDocument();
        expect(screen.getByText('iPhone 11')).toBeInTheDocument();

        const color = screen.getByText('Color:');

        expect(color).toBeInTheDocument();
        expect(screen.getByText('Oscuro')).toBeInTheDocument();

        await act(async () => {
            await result.current.setProductAttribute(product, 'Color', 'Azul');
        });

        expect(screen.getByText('Azul')).toBeInTheDocument();
    });
});
