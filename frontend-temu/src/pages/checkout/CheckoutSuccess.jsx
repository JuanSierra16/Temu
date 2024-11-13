import './Checkout.css';

const CheckoutSuccess = () => {
    return (
        <>
            <main className="checkout-success-container max-width">
                <h1>¡Gracias por tu compra!</h1>

                <p>
                    Tu compra ha sido realizada con éxito. En breve recibirás un
                    correo con la información de tu compra.
                </p>

                <img src="/checkout-success.png" alt="" />
            </main>
        </>
    );
};

export default CheckoutSuccess;
