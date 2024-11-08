import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { UserContext } from './UserContext';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotalCost, setCarTotalCost] = useState(0);

    const { userData } = useContext(UserContext);
    const userIdRef = useRef(null);

    useEffect(() => {
        const loadCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cost = loadCart.reduce((acc, item) => acc + item.subtotal, 0);
        setCart(loadCart);
        setCarTotalCost(Number(cost).toFixed(3));

        userIdRef.current = JSON.parse(localStorage.getItem('userId') || null);
    }, []);

    useEffect(() => {
        // mantener el carro de compra cuando el usuario inicia sesión
        // limpiar el carrito cuando el usuario cierra sesión

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

    useEffect(() => {
        let newCost = cart.reduce((acc, item) => acc + item.subtotal, 0);
        newCost = Number(newCost).toFixed(3);
        setCarTotalCost(newCost);

        /*
            guardar el id del usuario, si cambia a nulo (cierra sesión) se debe limpiar el carrito del localStorage

            En desarrollo siempre se renderiza dos veces, lo cual elimina el carrito si el usuario
            realizo login (desactivar el StrictMode)
        */
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart, userData]);

    const addCart = product => {
        const price = product.precio_con_descuento ?? product.precio;

        if (!cart.find(item => item.id === product.id)) {
            // seleccionar por defecto los primeros atributos del producto
            // agregar subtotal y cantidad
            const newProduct = {
                ...product,
                cart_quantity: 1,
                subtotal: price,
            };

            const newCart = [...cart, newProduct];
            setCart(newCart);
        }
    };

    const removeCart = product => {
        const newCart = cart.filter(item => item.id !== product.id);

        // si se encuentra el producto en el carrito
        if (newCart.length != cart.length) {
            setCart(newCart);
        }
    };

    const setQuantity = (product, quantity) => {
        // agregar cantidad del producto
        const newCart = cart.map(item => {
            if (item.id === product.id) {
                const price = item.precio_con_descuento ?? item.precio;

                return {
                    ...item,
                    cart_quantity: quantity,
                    subtotal: price * quantity,
                };
            }

            return item;
        });

        setCart(newCart);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addCart,
                removeCart,
                cartTotalCost,
                setQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
