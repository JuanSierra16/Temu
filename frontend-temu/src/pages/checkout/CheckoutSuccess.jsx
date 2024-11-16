import './Checkout.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CheckoutSuccess = () => {
    const navigation = useNavigate();

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
            checkoutState !== 'cancel' &&
            checkoutState === 'processing'
        ) {
            localStorage.setItem('checkout-state', 'success');
            localStorage.removeItem('checkout-code');
        }
    }, []);

    return (
        <main className="checkout-success-container max-width">
            <h1>¡Gracias por tu compra!</h1>

            <p>
                Tu compra ha sido realizada con éxito. En breve recibirás un
                correo con la información de tu compra.
            </p>

            <img src="/checkout-success.png" alt="" />

            <button onClick={() => navigation('/')}>Volver al inicio</button>
        </main>
    );
};

export default CheckoutSuccess;
