import { beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { verifyCoupon } from '../src/API/Coupon.API.js';

vi.mock('axios');

describe('Cupón de compra', () => {
    beforeEach(() => {
        axios.post.mockReset();
    });

    const couponSuccess = {
        isValid: true,
        message: 'Cupón valido',
        discount: 10,
    };

    const couponFail = {
        isValid: false,
        message: 'Cupón no valido',
        discount: 0,
    };

    test('API de cupones Cupón bueno', async () => {
        axios.post.mockResolvedValue({
            data: { ...couponSuccess, descuento: 10 },
            status: 200,
        });

        let res = await verifyCoupon(1, 'cupon10');
        expect(res).toEqual(couponSuccess);
    });

    test('API de cupones Cupón malo', async () => {
        axios.post.mockResolvedValueOnce({
            data: couponFail,
            status: 200,
        });

        const res = await verifyCoupon(1, 'cupon20');
        expect(res).toEqual(couponFail);
    });

    test('API de cupones Error en la petición', async () => {
        axios.post.mockRejectedValueOnce(new Error('Error en la petición'));

        const res = await verifyCoupon(1, 'cupon30');

        expect(res).toEqual({
            isValid: false,
            message: 'Error al verificar el cupón',
            discount: 0,
        });
    });
});
