import { useContext, useEffect, useRef, useState } from 'react';
import InputCode from '../../elements/InputCode';
import { UserContext } from '../../../provider/UserContext';

const PhoneCode = ({ phone }) => {
    const [code, setCode] = useState('');
    const codeRef = useRef('');

    const { loginWithPhone, loginError, waitLogin } = useContext(UserContext);

    useEffect(() => {
        codeRef.current = code;

        if (codeRef.current.length === 6) {
            loginWithPhone(codeRef.current, phone);
        }
    }, [code]);

    return (
        <div className="login-col">
            <h3>Ingresa el código de verificación</h3>
            <small>
                Enviamos un código de verificación a{' '}
                <span className="login-orange">{phone}</span>
            </small>

            <div className="phone-code">
                <InputCode setCode={setCode} disabled={waitLogin} />
            </div>

            <small className="login-error">{loginError}</small>
        </div>
    );
};

export default PhoneCode;
