import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { TestUserProvider } from '../../TestComponent.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../src/provider/UserContext.jsx';

describe('Login Teléfono SMSCode', () => {
    const userTest = {
        username: 'test',
        phone: '123456789',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mocks = vi.hoisted(() => ({
        post: vi.fn(url => {
            switch (url) {
                case '/users/send-verification-code-sms':
                    return Promise.resolve({
                        data: {
                            code: '123456',
                        },
                    });
                case '/users/login-with-phone':
                    return Promise.resolve({
                        data: {
                            user: {
                                username: 'test',
                                phone_number: '123456789',
                            },
                        },
                    });
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

    test('Unitaria Context sendSMSCode', async () => {
        const { result } = renderHook(() => useContext(UserContext), {
            wrapper: TestUserProvider,
        });

        await act(async () => {
            await result.current.sendSMSCode(userTest.phone);
            expect(mocks.post.mock.lastCall[0]).toBe(
                '/users/send-verification-code-sms',
            );
        });

        expect(result.current.phoneCodeSent).toBeTruthy();
    });

    test('Integración sendSMS, login Error, login', async () => {
        // se realiza llamados a la API, encerrar en un act para que espere la respuesta
        const { result } = renderHook(() => useContext(UserContext), {
            wrapper: TestUserProvider,
        });

        await act(async () => {
            await result.current.loginWithPhone('123456', userTest.phone); // no se ha enviado
        });

        await act(async () => {
            expect(result.current.loginError).toBeTypeOf('string'); // mensaje de error
        });

        await act(async () => {
            await result.current.sendSMSCode(userTest.phone);
        });

        await act(async () => {
            await result.current.loginWithPhone('000000', userTest.phone);
        });

        await act(async () => {
            expect(result.current.loginError).toBe(
                'Error el código de verificación no coincide',
            );
        });

        await act(async () => {
            await result.current.loginWithPhone('123456', userTest.phone);
        });

        await act(async () => {
            expect(result.current.phoneCodeSent).toBeTruthy();
            expect(result.current.loginError).toBeNull();
            expect(result.current.userIsLogin).toBeTruthy();
            expect(mocks.post.mock.lastCall[0]).toBe('/users/login-with-phone');
        });
    });
});
