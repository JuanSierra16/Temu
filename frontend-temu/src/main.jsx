import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './provider/UserContext.jsx';
import { CarProvider } from './provider/CarContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <CarProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </CarProvider>
        </GoogleOAuthProvider>
    </StrictMode>,
);
