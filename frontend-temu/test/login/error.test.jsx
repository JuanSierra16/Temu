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
import { useContext } from 'react';
import { UserContext } from '../../src/provider/UserContext.jsx';
import Login from '../../src/components/sections/login/Login.jsx';

describe('Login Error', () => {
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
            if (url === '/users/login') {
                return Promise.reject(new Error('Login error'));
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

    test('Hook mensaje de error', async () => {
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

        expect(result.current.loginError).toBeTypeOf('string');
    });

    test('Integrate Formulario de inicio de sesión, error', async () => {
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

        const errorMessage = await screen.findByRole('login-error');
        expect(errorMessage).toBeInTheDocument();
    });
});
