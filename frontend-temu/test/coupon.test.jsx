import { beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { verifyCoupon } from '../src/API/Coupon.API.js';
import {
    act,
    cleanup,
    fireEvent,
    render,
    renderHook,
    screen,
} from '@testing-library/react';
import {
    TestCartProvider,
    TestComponent,
    TestComponentInitial,
} from './TestComponent.jsx';
import { useContext } from 'react';
import { CartContext } from '../src/provider/CartContext.jsx';
import Checkout from '../src/pages/checkout/Checkout.jsx';
import { useCountry } from '../src/provider/UseCountry.js';

vi.mock('axios');

describe('Cupón de compra', () => {
    beforeEach(() => {
        cleanup();
        axios.post.mockReset();
    });

    const couponSuccess = {
        id: 1,
        isValid: true,
        message: 'Cupón valido',
        discount: 10,
    };

    const couponFail = {
        id: null,
        isValid: false,
        message: 'Cupón no valido',
        discount: 0,
    };

    const cartProduct = {
        id: 1,
        descripcion: 'Protector de colchón',
        precio_con_descuento: 100,
        precio: 100,
        imagenes: ['1pc Protector de colchón imper.webp'],
        atributos: {
            id: [1, 2, 3],
        },
        atributos_seleccionados: {
            id: [1, 2, 3],
        },
    };

    test('API de cupones Cupón bueno', async () => {
        axios.post.mockResolvedValue({
            data: {
                cupon: { ...couponSuccess, descuento: 10 },
                message: couponSuccess.message,
            },
            status: 200,
        });

        let res = await verifyCoupon(1, 'cupon10');
        expect(res).toEqual(couponSuccess);
    });

    test('API de cupones Cupón malo', async () => {
        axios.post.mockResolvedValueOnce({
            data: {
                cupon: { ...couponFail, descuento: 0 },
                message: couponFail.message,
            },
            status: 200,
        });

        const res = await verifyCoupon(1, 'cupon20');
        expect(res).toEqual(couponFail);
    });

    test('API de cupones Error en la petición', async () => {
        axios.post.mockRejectedValueOnce(new Error('Error en la petición'));

        const res = await verifyCoupon(1, 'cupon30');

        expect(res).toEqual({
            id: null,
            isValid: false,
            message: 'Error al verificar el cupón',
            discount: 0,
        });
    });

    test('Mostrar descuento monetario en el checkout', async () => {
        axios.post.mockResolvedValue({
            data: {
                cupon: { ...couponSuccess, descuento: couponSuccess.discount },
                message: couponSuccess.message,
            },
            status: 200,
        });

        render(
            <TestComponentInitial
                userPrompts={{ userIsLogin: true, userData: { id: 1 } }}
                cartPrompts={{ cart: [cartProduct] }}
            >
                <Checkout />
            </TestComponentInitial>,
        );

        const input = screen.getByPlaceholderText(
            'Ingresa el código del cupón',
        );
        expect(input).toBeInTheDocument();

        const productName = screen.getByText('Protector de colchón');
        expect(productName).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'cupon10' } });

        const button = screen.getByRole('button', { name: 'Aplicar' });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        const discount = screen.getByText('Descuento del cupón (0%):');
        expect(discount).toBeInTheDocument();
    });
});
