import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
    act,
    render,
    renderHook,
    screen,
    waitFor,
} from '@testing-library/react';
import TestComponent from '../TestComponent.jsx';
import Login from '../../src/components/sections/login/Login.jsx';
import { useContext } from 'react';
import { UserContext } from '../../src/provider/UserContext.jsx';

describe('Login Success', () => {
    const userTest = {
        username: 'test',
        email: 'test@mail.com',
        password: 'test123',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mocks = vi.hoisted(() => ({
        post: vi.fn(url => {
            switch (url) {
                case '/users/login':
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
                                medida: {},
                            },
                            token: 'test123',
                        },
                    });
                case '/users/login/has-profile':
                    return Promise.resolve({
                        data: {
                            exists: true,
                        },
                    });
                default:
                    return Promise.reject(new Error('Not Found'));
            }
        }),
    }));

    vi.mock('axios', async importActual => {
        const actual = await importActual('axios');

        return {
            default: {
                ...actual.default,
                create: vi.fn(() => ({
                    ...actual.default.create(),
                    get: mocks.get,
                    post: mocks.post,
                })),
            },
        };
    });

    test('Unit user hook test Inicio de sesión con email y contraseña', async () => {
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

    test('Formulario de inicio de sesión', async () => {
        render(<Login />, {
            wrapper: TestComponent,
        });

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

        const loginButton = screen.getByRole('button-login');
        expect(loginButton).toBeInTheDocument();
        await userEvent.click(loginButton);
    });
});
