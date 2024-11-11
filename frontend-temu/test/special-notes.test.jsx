import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { TestUserProvider } from './TestComponent.jsx';
import Address from '../src/pages/user/Address.jsx';

describe('Campo para notas especiales de entrega', () => {
    test('Vista de direcciones y formulario', async () => {
        render(<Address />, {
            wrapper: TestUserProvider,
        });

        fireEvent.click(screen.getByRole('button', { name: /Agregar*/i }));

        const options = screen.getByRole('textbox', {
            name: 'Información Adicional / Opciones de entrega',
        });

        expect(options).toBeInTheDocument();
        fireEvent.change(options, { target: { value: 'Test' } });

        expect(options).toHaveValue('Test');
    });
});
