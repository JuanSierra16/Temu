import './Checkout.css';
import { useContext } from 'react';
import SimpleNav from '../components/sections/navbar/SimpleNav';
import { CartContext } from '../provider/CartContext';

const Checkout = () => {
    const { cart } = useContext(CartContext);

    return (
        <>
            <SimpleNav />

            <main className="max-width checkout">
                <h2>Completa tu compra</h2>
            </main>
        </>
    );
};

export default Checkout;
