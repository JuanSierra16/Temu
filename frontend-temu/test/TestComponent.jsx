import { UserProvider } from '../src/provider/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProductsProvider } from '../src/provider/ProductsContext';
import { CartProvider } from '../src/provider/CartContext';
import { MemoryRouter } from 'react-router-dom';

export const TestUserProvider = ({ children }) => {
    return (
        <GoogleOAuthProvider>
            <UserProvider>
                <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
            </UserProvider>
        </GoogleOAuthProvider>
    );
};

export const TestProductsProvider = ({ children }) => {
    return (
        <ProductsProvider>
            <CartProvider>
                <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
            </CartProvider>
        </ProductsProvider>
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
