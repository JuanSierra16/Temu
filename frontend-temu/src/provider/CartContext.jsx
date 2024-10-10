import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from './UserContext';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotalCost, setCarTotalCost] = useState(0);

    const { userData } = useContext(UserContext);
    const userIdRef = useRef(null);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
        setCarTotalCost(JSON.parse(localStorage.getItem('cartTotalCost') || 0));
        userIdRef.current = JSON.parse(localStorage.getItem('userId') || null);
    }, []);

    useEffect(() => {
        if (userData.id) {
            localStorage.setItem('userId', userData.id);

            if (userIdRef.current && userIdRef.current !== userData.id) {
                setCart([]);
                setCarTotalCost(0);
                localStorage.removeItem('cart');
                localStorage.removeItem('cartTotalCost');
                localStorage.removeItem('userId');
            }
        }

        if (userData.id === '' && userIdRef.current) {
            setCart([]);
            setCarTotalCost(0);
            localStorage.removeItem('cart');
            localStorage.removeItem('cartTotalCost');
            localStorage.removeItem('userId');
        }
    }, [userData]);

    const saveLocalStorage = (newCart, newCost) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        localStorage.setItem('cartTotalCost', JSON.stringify(newCost));
        /*
            guardar el id del usuario, si cambia a nulo (cierra sesión) se debe limpiar el carrito del localStorage

            En desarrollo siempre se renderiza dos veces, lo cual elimina el carrito si el usuario
            realizo login (desactivar el StrictMode)
        */
        localStorage.setItem('userId', userData.id);
        console.log(userData.id);
    };

    const addCart = product => {
        const price = String(product.price).replace('.', '').replace('$', '');

        if (!cart.find(item => item.title === product.title)) {
            const newCart = [...cart, product];
            const newCost = parseFloat(cartTotalCost) + parseFloat(price);

            setCart(newCart);
            setCarTotalCost(newCost);
            saveLocalStorage(newCart, newCost);
        }
    };

    const removeCart = product => {
        const price = String(product.price).replace('.', '').replace('$', '');
        const newCart = cart.filter(item => item.title !== product.title);
        const newCost = parseFloat(cartTotalCost) - parseFloat(price);

        setCart(newCart);
        setCarTotalCost(newCost);
        saveLocalStorage(newCart, newCost);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addCart,
                removeCart,
                cartTotalCost,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
