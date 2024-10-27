import { beforeEach, describe, expect, test, vi } from 'vitest';
import Cookies from 'js-cookie';
import UserMenu from '../components/sections/navbar/UserMenu';
import userEvent from '@testing-library/user-event';
import {
    act,
    render,
    renderHook,
    waitFor,
    screen,
} from '@testing-library/react';
import TestComponent from './TestComponent';
import { useContext } from 'react';
import { UserContext } from '../provider/UserContext';

describe('Login Mock', () => {
    const userTest = {
        username: 'test',
        email: 'test@mail.com',
        password: 'test123',
    };

    beforeEach(() => {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('token');
        Cookies.remove('user');
        vi.clearAllMocks();
    });

    const mocks = vi.hoisted(() => ({
        get: vi.fn(url => {
            if (url === '/products') {
                return Promise.resolve({
                    data: [],
                });
            }

            return Promise.reject(new Error('Not Found'));
        }),
        post: vi.fn(url => {
            if (url === '/users/login') {
                return Promise.resolve({
                    data: {
                        user: {
                            id: '123',
                            id_usuario_plataforma: '',
                            nombre_plataforma: '',
                            username: 'test',
                            email: 'test@mail.com',
                            phone_number: '',
                            is_verified: false,
                            created_at: '',
                            medidas: {},
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
        }),
    }));

    vi.mock('axios', async importActual => {
        const actual = await importActual('axios');

        const mockAxios = {
            default: {
                ...actual.default,
                create: vi.fn(() => ({
                    ...actual.default.create(),
                    get: mocks.get,
                    post: mocks.post,
                })),
            },
        };

        return mockAxios;
    });

    test('Inicio de sesión con email y contraseña', async () => {
        render(<UserMenu />, { wrapper: TestComponent });

        const loginModal = await screen.findByText(
            'Iniciar sesión/Registrarse',
        );
        expect(loginModal).toBeInTheDocument();
        await userEvent.click(loginModal);

        await waitFor(async () => {
            const inputEmail = await screen.findByRole('input-email');
            expect(inputEmail).toBeInTheDocument();
            await userEvent.type(inputEmail, userTest.email);
            expect(inputEmail).toHaveValue(userTest.email);
        });

        const continueButton = screen.getByRole('button-continue');
        expect(continueButton).toBeInTheDocument();
        await userEvent.click(continueButton);

        expect(mocks.post).toHaveBeenCalledTimes(2); // se ejecuta el hasProfileAction
        expect(mocks.post.mock.lastCall[0]).not.toBe('/users/login'); // error algo ya está ejecutando el login

        const logout = screen.queryByRole('logout');
        expect(logout).not.toBeInTheDocument();

        await waitFor(async () => {
            const inputPassword = await screen.findByRole('input-password');
            expect(inputPassword).toBeInTheDocument();
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

    test('user hook test Inicio de sesión con email y contraseña', async () => {
        const { result } = renderHook(() => useContext(UserContext), {
            wrapper: TestComponent,
        });

        await act(async () => {
            await result.current.loginHasProfileAction(userTest.email);
            expect(mocks.post.mock.lastCall[0]).toBe(
                '/users/login/has-profile',
            );

            expect(result.current.noHasProfile).not.toBeTruthy();
        });

        await act(async () => {
            await result.current.loginAction(userTest.email, userTest.password);
            expect(mocks.post.mock.lastCall[0]).toBe('/users/login');
        });

        expect({
            username: result.current.userData.username,
            email: result.current.userData.email,
        }).toEqual({
            username: userTest.username,
            email: userTest.email,
        });
    });
});
