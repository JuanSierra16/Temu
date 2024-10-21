import { vi } from 'vitest';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
export const mockAxios = vi.spyOn(axios, 'post');

mockAxios.mockImplementation(url => {
    if (url === `${BASE_URL}/users/login`) {
        return Promise.resolve({
            data: {
                user: {
                    username: 'test',
                    email: 'test@mail.com',
                    password: 'test123',
                },
                token: 'test',
            },
        });
    }

    return Promise.reject();
});
