import { UserProvider, UserContext } from '../src/provider/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
    ProductsProvider,
    ProductsContext,
} from '../src/provider/ProductsContext';
import { CartProvider, CartContext } from '../src/provider/CartContext';
import { MemoryRouter } from 'react-router-dom';

export const TestUserProvider = ({ children, userData }) => {
    return (
        <GoogleOAuthProvider>
            <UserProvider
                value={{ userData: userData ?? {}, userIsLogin: true }}
            >
                <ProductsProvider value={{ products: [] }}>
                    <CartProvider value={{ cart: [] }}>
                        <MemoryRouter initialEntries={['/']}>
                            {children}
                        </MemoryRouter>
                    </CartProvider>
                </ProductsProvider>
            </UserProvider>
        </GoogleOAuthProvider>
    );
};

export const TestUserContext = ({ children, userData }) => {
    return (
        <GoogleOAuthProvider>
            <UserContext.Provider
                value={{ userData: userData ?? {}, userIsLogin: true }}
            >
                <ProductsProvider value={{ products: [] }}>
                    <CartProvider value={{ cart: [] }}>
                        <MemoryRouter initialEntries={['/']}>
                            {children}
                        </MemoryRouter>
                    </CartProvider>
                </ProductsProvider>
            </UserContext.Provider>
        </GoogleOAuthProvider>
    );
};

export const TestProductsProvider = ({ children, products }) => {
    return (
        <GoogleOAuthProvider>
            <UserProvider value={{ userData: {} }}>
                <ProductsProvider value={{ products: products ?? [] }}>
                    <CartProvider value={{ cart: [] }}>
                        <MemoryRouter initialEntries={['/']}>
                            {children}
                        </MemoryRouter>
                    </CartProvider>
                </ProductsProvider>
            </UserProvider>
        </GoogleOAuthProvider>
    );
};

export const TestCartProvider = ({ children, cart }) => {
    return (
        <GoogleOAuthProvider>
            <UserProvider value={{ userData: {} }}>
                <ProductsProvider value={{ products: [] }}>
                    <CartProvider value={{ cart: cart ?? [] }}>
                        <MemoryRouter initialEntries={['/']}>
                            {children}
                        </MemoryRouter>
                    </CartProvider>
                </ProductsProvider>
            </UserProvider>
        </GoogleOAuthProvider>
    );
};

export const TestComponent = ({ children }) => {
    return (
        <GoogleOAuthProvider>
            <UserProvider>
                <ProductsProvider>
                    <CartProvider>
                        <MemoryRouter initialEntries={['/']}>
                            {children}
                        </MemoryRouter>
                    </CartProvider>
                </ProductsProvider>
            </UserProvider>
        </GoogleOAuthProvider>
    );
};

export const TestComponentInitial = ({
    children,
    userPrompts,
    productPrompts,
    cartPrompts,
    initialRoute,
}) => {
    return (
        <GoogleOAuthProvider>
            <UserContext.Provider value={{ ...userPrompts }}>
                <ProductsContext.Provider
                    value={{
                        ...productPrompts,
                        products: productPrompts?.products ?? [],
                    }}
                >
                    <CartContext.Provider
                        value={{
                            ...cartPrompts,
                            cart: cartPrompts?.cart ?? [],
                        }}
                    >
                        <MemoryRouter initialEntries={[initialRoute ?? '/']}>
                            {children}
                        </MemoryRouter>
                    </CartContext.Provider>
                </ProductsContext.Provider>
            </UserContext.Provider>
        </GoogleOAuthProvider>
    );
};
