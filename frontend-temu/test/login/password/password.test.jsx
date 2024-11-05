import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { TestUserProvider } from '../../TestComponent.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../src/provider/UserContext.jsx';

describe('Cambio de contraseña', () => {
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
                case '/users/send-verificaction-code':
                    return Promise.resolve({
                        data: {
                            code: '123456',
                        },
                    });
                case '/users/update-password':
                    return Promise.resolve({
                        data: {
                            user: {
                                username: 'test',
                                email: 'test@mail.com',
                            },
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

    test('Context Enviar código	de verificación', async () => {
        const { result } = renderHook(() => useContext(UserContext), {
            wrapper: TestUserProvider,
        });

        await act(async () => {
            expect(result.current.passwordCodeSent).not.toBeTruthy();
            await result.current.sendPasswordCode(userTest.email);
        });

        await act(async () => {
            await result.current.loginAction(userTest.email, userTest.password);
            expect(result.current.passwordCodeSent).toBeTruthy();
        });
    });

    test('Context Cambiar contraseña correctamente', async () => {
        const { result } = renderHook(() => useContext(UserContext), {
            wrapper: TestUserProvider,
        });

        await act(async () => {
            await result.current.resetPassword(
                userTest.email,
                'randomPassword',
            );
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
