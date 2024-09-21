import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../provider/UserContext';
import InputCode from '../../elements/InputCode';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const codeRef = useRef('');

    const {
        passwordCodeSent,
        sendPasswordCode,
        resetPassword,
        isEqualPasswordCode,
        loginHasProfileAction,
        noHasProfile,
        equalPasswordCode,
        loginError,
    } = useContext(UserContext);

    const handleSendCode = () => {
        if (!email) {
            return;
        }

        loginHasProfileAction(email);

        if (!noHasProfile) {
            sendPasswordCode(email);
        }
    };

    useEffect(() => {
        codeRef.current = code;

        if (codeRef.current.length === 6) {
            isEqualPasswordCode(codeRef.current);
        }
    }, [code, isEqualPasswordCode]);

    const handleResetPassword = () => {
        if (!password) {
            return;
        }

        resetPassword(email, password);
    };

    return (
        <div className="login-reset-password">
            {!passwordCodeSent && (
                <>
                    <h2>Olvidé mi contraseña</h2>

                    <p>
                        Ingresa tu dirección de email a continuación y te
                        enviaremos un código de 6 dígitos para el
                        restablecimiento de tu contraseña.
                    </p>

                    <label htmlFor="email">
                        Dirección de email
                        <input
                            type="email"
                            placeholder="Dirección de email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>

                    <button className="orange-button" onClick={handleSendCode}>
                        Enviar
                    </button>
                </>
            )}

            {passwordCodeSent && !equalPasswordCode && (
                <>
                    <h2>
                        Ingresa el código el código de restablecimiento de
                        contraseña
                    </h2>

                    <p>
                        ¡Verifica tu buzón de entrada! Ingresa el código de 6
                        dígitos para el restablecimiento de tu contraseña que se
                        envió a <span className="login-orange">{email}</span>.
                    </p>

                    <label htmlFor="code">
                        <InputCode setCode={setCode} />
                    </label>

                    <small>¿No recibiste el correo electrónico?</small>
                    <small>
                        1. Asegúrate de que tu dirección de email sea correcta.
                    </small>
                    <small>2. Revisa tu carpeta de correo no deseado.</small>

                    <small style={{ color: 'red' }}>{loginError}</small>
                </>
            )}

            {equalPasswordCode && (
                <>
                    <h2>Crea una nueva contraseña</h2>

                    <p>
                        Ingresa una nueva contraseña que te gustaría asociar a
                        tu cuenta a continuación.
                    </p>

                    <label htmlFor="password">
                        Contraseña
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Ingresa una nueva contraseña"
                        />
                    </label>

                    <small>
                        No utilices una contraseña de otro sitio ni algo
                        demasiado obvio como el nombre de tu mascota
                    </small>

                    <button
                        className="orange-button"
                        onClick={handleResetPassword}
                    >
                        Restablecer
                    </button>

                    <small style={{ color: 'red' }}>{loginError}</small>
                </>
            )}
        </div>
    );
};

export default ResetPassword;
