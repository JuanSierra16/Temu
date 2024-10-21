import { describe, it, expect, beforeEach, vi, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import TestComponent from './TestComponent';
// import { mockAxios } from './AxiosMack';
import DeskNavBar from '../components/sections/navbar/DeskNavBar';
import UserMenu from '../components/sections/navbar/UserMenu';
import NavBar from '../components/sections/navbar/NavBar';

// describe('Login', () => {
//     const userTest = {
//         email: 'test@mail.com',
//         password: 'test123',
//         username: 'test',
//     };

//     test('Login with email and password', async () => {
//         render(<UserMenu />, {
//             wrapper: TestComponent,
//         });

//         const loginModal = screen.getByText('Iniciar sesión/Registrarse');
//         expect(loginModal).toBeInTheDocument();
//         await userEvent.click(loginModal);

//         const inputEmail = screen.getByRole('input-email');
//         expect(inputEmail).toBeInTheDocument();
//         await userEvent.type(inputEmail, userTest.email);
//         expect(inputEmail).toHaveValue(userTest.email);

//         const continueButton = screen.getByRole('button-continue');
//         expect(continueButton).toBeInTheDocument();
//         await userEvent.click(continueButton);

//         await waitFor(async () => {
//             const inputPassword = await screen.findByRole('input-password');
//             expect(inputPassword).toBeInTheDocument();
//             await userEvent.click(inputPassword);
//             await userEvent.type(inputPassword, userTest.password);
//             expect(inputPassword).toHaveValue(userTest.password);
//         });

//         const loginButton = await screen.findByRole('button-login');
//         expect(loginButton).toBeInTheDocument();
//         await userEvent.click(loginButton);

//         await waitFor(async () => {
//             // se cierra la modal
//             const checkHide = screen.queryByRole('input-email');
//             expect(checkHide).not.toBeInTheDocument();
//         });

//         const userName = await screen.findByRole('username');
//         expect(userName).toBeInTheDocument();
//         expect(userName).toHaveTextContent(/Hola test/);
//     });
// });

import { API } from '../API/Login.API';

describe('Login Mock', () => {
    const userTest = {
        username: 'test',
        email: 'test@mail.com',
        password: 'test123',
    };

    test('Inicio de sesión con email y contraseña', async () => {
        vi.spyOn(API, 'post').mockImplementation(url => {
            if (url === '/users/login') {
                return Promise.resolve({
                    data: {
                        user: {
                            username: 'test123',
                            email: 'test@mail.com',
                            password: 'test123',
                        },
                        token: 'test123',
                    },
                });
            } else if (url === '/users/login/has-profile') {
                return Promise.resolve({
                    data: {
                        exists: true,
                    },
                });
            }

            return Promise.reject(new Error('Not Found'));
        });

        render(<UserMenu />, { wrapper: TestComponent });
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
            await userEvent.click(inputPassword);
            await userEvent.type(inputPassword, userTest.password);
            expect(inputPassword).toHaveValue(userTest.password);
        });

        const loginButton = await screen.findByRole('button-login');
        expect(loginButton).toBeInTheDocument();
        await userEvent.click(loginButton);

        await waitFor(async () => {
            // se cierra la modal
            const checkHide = screen.queryByRole('input-email');
            expect(checkHide).not.toBeInTheDocument();
        });

        const userName = await screen.findByRole('username');
        expect(userName).toBeInTheDocument();
        expect(userName).toHaveTextContent(/Hola test/);
    });
});
