import { beforeEach, describe, expect, test, vi } from 'vitest';
import { updateUserDetails } from '../src/API/Login.API.js';
import { UserContext } from '../src/provider/UserContext.jsx';
import { useContext } from 'react';
import {
    act,
    render,
    renderHook,
    screen,
    waitFor,
} from '@testing-library/react';
import { TestComponent, TestUserProvider } from './TestComponent.jsx';
import axios from 'axios';
import Profile from '../src/pages/user/Profile.jsx';

vi.mock('axios');

describe('Información de usuario', () => {
    const medidas = {
        medida_pecho: 130,
        medida_cintura: 90,
        medida_cadera: 100,
        estatura: 180,
        peso: 80,
        unidad_medida: 'cm',
    };

    const userTest = {
        id: 1,
        username: 'test',
        medidas: medidas,
    };

    beforeEach(() => {
        axios.put.mockReset();
        axios.get.mockReset();
    });

    test('Axios updateUserDetails', async () => {
        axios.put.mockResolvedValue({
            data: { status: 200 },
        });

        await updateUserDetails(...Object.values(userTest));
        const expectedUrlPath = '/users/1/details';

        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(axios.put.mock.calls[0][0].endsWith(expectedUrlPath)).toBe(true);
    });

    test('Contexto updateUserDetails', async () => {
        const { result } = renderHook(() => useContext(UserContext), {
            wrapper: TestUserProvider,
        });

        axios.put.mockResolvedValue({
            status: 200,
        });

        await act(async () => {
            await result.current.updateSizeMeasurements(
                userTest.username,
                medidas.medida_pecho,
                medidas.medida_cintura,
                medidas.medida_cadera,
                medidas.estatura,
                medidas.peso,
                medidas.unidad_medida,
            );
        });

        expect(result.current.userData.medidas).toEqual(medidas);
    });

    test('Contexto Error con updateUserDetails', async () => {
        axios.put.mockResolvedValue({
            data: { status: 404 },
        });

        const { result } = renderHook(() => useContext(UserContext), {
            wrapper: TestUserProvider,
        });

        await act(async () => {
            await result.current.updateSizeMeasurements(
                ...Object.values(userTest),
            );
        });

        expect(result.current.loginError).toBe(
            'Error no se pudo actualizar los datos',
        );
    });

    test('Formulario campos de para updateSizeMeasurements', async () => {
        render(<Profile />, {
            wrapper: TestComponent,
        });

        const { result } = renderHook(() => useContext(UserContext), {
            wrapper: TestComponent,
        });

        await act(async () => {
            // iniciar sesión, datos básicos
            result.current.userData = userTest;
            result.current.userIsLogin = true;
        });

        await act(async () => {
            expect(result.current.userData.medidas).toEqual(medidas);
        });

        await waitFor(async () => {
            expect(screen.getByLabelText('Nombres')).toBeInTheDocument();
            expect(
                screen.getByLabelText('Medida de pecho'),
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText('Medida de cintura'),
            ).toBeInTheDocument();
            expect(
                screen.getByLabelText('Medida de cadera'),
            ).toBeInTheDocument();
            expect(screen.getByLabelText('Estatura')).toBeInTheDocument();
            expect(screen.getByLabelText('Peso')).toBeInTheDocument();
        });
    });
});
