import { createContext, useState } from 'react';

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartTotalCost, setCarTotalCost] = useState(0);

    const addCart = product => {
        const price = String(product.price).replace('.', '').replace('$', '');

        if (!cart.find(item => item.title === product.title)) {
            setCart([...cart, product]);
            setCarTotalCost(parseFloat(cartTotalCost) + parseFloat(price));
        }
    };

    const removeCart = product => {
        const price = String(product.price).replace('.', '').replace('$', '');

        setCart(cart.filter(item => item.title !== product.title));
        setCarTotalCost(cartTotalCost - parseFloat(price));
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
