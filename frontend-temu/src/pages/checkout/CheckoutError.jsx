import { useEffect } from 'react';
import './Checkout.css';

const CheckoutError = () => {
    useEffect(() => {
        const tokenFromUrl = new URLSearchParams(window.location.search).get(
            'code',
        );
        const checkoutState = localStorage.getItem('checkout-state') || null;
        const code = localStorage.getItem('checkout-code') || null;

        if (
            tokenFromUrl &&
            code &&
            tokenFromUrl === code &&
            checkoutState !== 'success' &&
            checkoutState === 'processing'
        ) {
            localStorage.setItem('checkout-state', 'cancel');
            localStorage.removeItem('checkout-code');
        }
    }, []);

    return (
        <div className="checkout-error-container">
            <h1>Hubo un error con tu compra</h1>
        </div>
    );
};

export default CheckoutError;
