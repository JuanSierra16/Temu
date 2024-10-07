import { createContext, useState } from 'react';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotalCost, setCarTotalCost] = useState(0);

    const addCart = product => {
        setCart([...cart, product]);
        setCarTotalCost(cartTotalCost + product.price);
    };

    const removeCart = product => {
        setCart(cart.filter(item => item.id !== product.id));
        setCart(cart.filter(item => item.title !== product.title));
        setCarTotalCost(cartTotalCost - product.price);
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
