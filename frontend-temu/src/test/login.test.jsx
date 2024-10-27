import { describe, expect, beforeEach, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import TestComponent from './TestComponent';
import Cookies from 'js-cookie';
import UserMenu from '../components/sections/navbar/UserMenu';

// api real
describe('Login', () => {
    const userTest = {
        email: 'test@mail.com',
        password: 'test123',
        username: 'test',
    };

    beforeEach(() => {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('token');
        Cookies.remove('user');
    });

    test('Login with email and password', async () => {
        render(<UserMenu />, {
            wrapper: TestComponent,
        });

        const loginModal = screen.getByText('Iniciar sesión/Registrarse');
        expect(loginModal).toBeInTheDocument();
        await userEvent.click(loginModal);

        const inputEmail = screen.getByRole('input-email');
        expect(inputEmail).toBeInTheDocument();
        await userEvent.type(inputEmail, userTest.email);
        expect(inputEmail).toHaveValue(userTest.email);

        const continueButton = screen.getByRole('button-continue');
        expect(continueButton).toBeInTheDocument();
        await userEvent.click(continueButton);

        await waitFor(async () => {
            const inputPassword = await screen.findByRole('input-password');
            expect(inputPassword).toBeInTheDocument();
            await userEvent.type(inputPassword, userTest.password);
            expect(inputPassword).toHaveValue(userTest.password);
        });

        const loginButton = await screen.findByRole('button-login');
        expect(loginButton).toBeInTheDocument();
        await userEvent.click(loginButton);

        const userName = await screen.findByRole('username');
        expect(userName).toBeInTheDocument();
        expect(userName).toHaveTextContent(/Hola test/);
    });
});
