import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotalCost, setCarTotalCost] = useState(0);

    const { userData } = useContext(UserContext);

    useEffect(() => {
        const loadCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cost = loadCart.reduce((acc, item) => acc + item.subtotal, 0);
        setCart(loadCart);
        setCarTotalCost(Number(cost).toFixed(2));
    }, []);

    useEffect(() => {
        // mantener el carro de compra cuando el usuario inicia sesión
        // limpiar el carrito cuando el usuario cierra sesión
    }, [userData]);

    useEffect(() => {
        let newCost = cart.reduce(
            (acc, item) => acc + parseFloat(item.subtotal),
            0,
        );
        newCost = Number(newCost).toFixed(2);
        setCarTotalCost(newCost);

        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addCart = product => {
        const price = product.precio_con_descuento ?? product.precio;

        if (!cart.find(item => item.id === product.id)) {
            // seleccionar por defecto los primeros atributos del producto
            // agregar subtotal y cantidad
            let atributos_seleccionados = {};

            for (const key in product.atributos) {
                atributos_seleccionados[key] = product.atributos[key][0];
            }

            const newProduct = {
                ...product,
                cantidad: 1,
                subtotal: price,
                atributos_seleccionados: atributos_seleccionados,
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
                let price = item.precio_con_descuento ?? item.precio;
                const subtotal = Number(price) * Number(quantity);

                return {
                    ...item,
                    cantidad: parseInt(quantity),
                    subtotal: subtotal,
                };
            }

            return item;
        });

        setCart(newCart);
    };

    const setProductAttribute = (product, attribute, value) => {
        const newCart = cart.map(item => {
            if (item.id === product.id) {
                if (
                    !item.atributos_seleccionados ||
                    !item.atributos_seleccionados[attribute]
                ) {
                    return item;
                }

                return {
                    ...item,
                    atributos_seleccionados: {
                        ...item.atributos_seleccionados,
                        [attribute]: value,
                    },
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
                setProductAttribute,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
