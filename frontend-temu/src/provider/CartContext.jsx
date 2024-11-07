import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from './UserContext';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotalCost, setCarTotalCost] = useState(0);

    const { userData } = useContext(UserContext);
    const userIdRef = useRef(null);

    useEffect(() => {
        const loadCart = JSON.parse(localStorage.getItem('cart') || '[]');

        setCart(loadCart);
        userIdRef.current = JSON.parse(localStorage.getItem('userId') || null);

        const cost = loadCart.reduce(
            (acc, item) =>
                acc + item.precio_con_descuento
                    ? item.precio_con_descuento
                    : item.precio,
            0,
        );

        setCarTotalCost(Number(cost).toFixed(3));
    }, []);

    useEffect(() => {
        if (userData.id) {
            localStorage.setItem('userId', userData.id);

            if (userIdRef.current && userIdRef.current !== userData.id) {
                setCart([]);
                setCarTotalCost(0);
                localStorage.removeItem('cart');
                localStorage.removeItem('userId');
            }
        }

        if (userData.id === '' && userIdRef.current) {
            setCart([]);
            setCarTotalCost(0);
            localStorage.removeItem('cart');
            localStorage.removeItem('userId');
        }
    }, [userData]);

    const saveLocalStorage = (newCart, newCost) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCarTotalCost(newCost);
        /*
            guardar el id del usuario, si cambia a nulo (cierra sesión) se debe limpiar el carrito del localStorage

            En desarrollo siempre se renderiza dos veces, lo cual elimina el carrito si el usuario
            realizo login (desactivar el StrictMode)
        */
        localStorage.setItem('userId', userData.id);
    };

    const addCart = product => {
        const price = product.precio_con_descuento
            ? product.precio_con_descuento
            : product.precio;

        if (!cart.find(item => item.id === product.id)) {
            const newCart = [...cart, product];
            const newCost = Number(cartTotalCost) + Number(price);

            setCart(newCart);
            setCarTotalCost(newCost);
            saveLocalStorage(newCart, Number(newCost).toFixed(3));
        }
    };

    const removeCart = product => {
        const newCart = cart.filter(item => item.id !== product.id);

        // si se encuentra el producto en el carrito
        if (newCart.length != cart.length) {
            const price = product.precio_con_descuento
                ? product.precio_con_descuento
                : product.precio;

            let newCost = Number(cartTotalCost) - Number(price);

            if (newCost < 0 && newCart.length === 0) {
                newCost = 0;
            }

            setCart(newCart);
            setCarTotalCost(newCost);
            saveLocalStorage(newCart, Number(newCost).toFixed(3));
        }
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
