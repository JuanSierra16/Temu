import { useContext } from 'react';
import InputCode from '../../elements/InputCode';
import { UserContext } from '../../../provider/UserContext';

const LoginVerify = ({ email, setEmailCode }) => {
    const { loginError } = useContext(UserContext);

    return (
        <div className="login-verify">
            <h3>Completa el proceso de verificación</h3>

            <small>
                Enviamos un código a{' '}
                <span className="login-orange">{email}</span> Ingrésalo a
                continuacion
            </small>

            <InputCode setCode={setEmailCode} />

            <p>
                Si no has recibido el código, comprueba tus carpetas de correo
                no deseado y papelera
            </p>

            <p>{loginError}</p>
        </div>
    );
};

export default LoginVerify;
