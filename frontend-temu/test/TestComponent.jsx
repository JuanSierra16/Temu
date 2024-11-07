import { UserProvider } from '../src/provider/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProductsProvider } from '../src/provider/ProductsContext';
import { CartProvider } from '../src/provider/CartContext';
import { MemoryRouter } from 'react-router-dom';

export const TestUserProvider = ({ children, userData }) => {
    return (
        <GoogleOAuthProvider>
            <UserProvider value={{ userData }}>
                <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
            </UserProvider>
        </GoogleOAuthProvider>
    );
};

export const TestProductsProvider = ({ children, products }) => {
    return (
        <UserProvider value={{ userData: {} }}>
            <ProductsProvider value={{ products }}>
                <CartProvider value={{ cart: [] }}>
                    <MemoryRouter initialEntries={['/']}>
                        {children}
                    </MemoryRouter>
                </CartProvider>
            </ProductsProvider>
        </UserProvider>
    );
};

export const TestCartProvider = ({ children, cart }) => {
    return (
        <UserProvider value={{ userData: {} }}>
            <ProductsProvider value={{ products: [] }}>
                <CartProvider value={{ cart }}>
                    <MemoryRouter initialEntries={['/']}>
                        {children}
                    </MemoryRouter>
                </CartProvider>
            </ProductsProvider>
        </UserProvider>
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
