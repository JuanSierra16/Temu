import { UserProvider } from '../src/provider/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProductsProvider } from '../src/provider/ProductsContext';
import { CartProvider } from '../src/provider/CartContext';
import { MemoryRouter } from 'react-router-dom';

const TestComponent = ({ children }) => {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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

export default TestComponent;
