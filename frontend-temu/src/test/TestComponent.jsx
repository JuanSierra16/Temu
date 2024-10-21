import { UserProvider } from '../provider/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProductsProvider } from '../provider/ProductsContext';
import { CartProvider } from '../provider/CartContext';
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
