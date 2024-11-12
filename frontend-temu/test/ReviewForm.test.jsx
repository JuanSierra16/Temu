import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TestUserProvider } from './TestComponent.jsx';
import axios from 'axios';
import ReviewForm from '../src/pages/ReviewForm.jsx';
import Favorite from '../src/pages/user/Favorite.jsx';
import { addReviewProduct, getFavoriteProducts } from '../src/API/Products.API.js';

vi.mock('axios');

describe('Reseñas de productos', () => {
    beforeEach(() => {
        axios.get.mockReset();
    });

    const reviewtest = 
        {
            product : 1,
            review : 'Excelente producto',
            rating : 5,
            userid : 1,
        };

    test('Axios reseñas', async () => {
        axios.post.mockResolvedValue({
            status: 200,
        });

        const res = await addReviewProduct(1, 'Excelente producto', 5, 1);
        const expectedUrlPath = '/products/reviews';

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post.mock.calls[0][0].endsWith(expectedUrlPath)).toBe(true);

        expect(res).toBe(true);
    });
});
