import { useContext, useEffect, useRef, useState } from 'react';
import { FaTruckFast, FaLock } from 'react-icons/fa6';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { supportPrefixPhone } from '../../../utils/data';
import { UserContext } from '../../../provider/UserContext';
import LoginForm from './LoginForm';
import PhoneCode from './PhoneCode';
import { Link } from 'react-router-dom';
import './Login.css';
import InputCode from '../../elements/InputCode';

const Login = ({ clear, setShowLoginProblem }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phonePrefix, setPhonePrefix] = useState('');
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [putPassword, setPutPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [countryValue, setCountryValue] = useState('');
    const [showPhoneCode, setShowPhoneCode] = useState(false);

    const {
        loginAction,
        waitLogin,
        loginError,
        loginHasProfileAction,
        sendCode,
        verifyEmailCode,
    } = useContext(UserContext);

    useEffect(() => {
        // por defecto el primer prefijo de la lista
        const { countryCode, prefix } = supportPrefixPhone[0];
        setCountryValue(`${countryCode} ${prefix}`);
        setPhonePrefix(prefix);
    }, []);

    useEffect(() => {
        if (clear) {
            setEmail('');
            setPhone('');
            setPhonePrefix('');
            setIsPhoneNumber(false);
            setPutPassword(false);
            setPassword('');
            setCountryValue('');
            setShowPhoneCode(false);

            const { countryCode, prefix } = supportPrefixPhone[0];
            setCountryValue(`${countryCode} ${prefix}`);
            setPhonePrefix(prefix);
        }
    }, [clear]);

    const handleEmail = event => {
        const newInputValue = event.target.value;
        setPutPassword(false);

        if (/^\d+$/.test(newInputValue)) {
            setIsPhoneNumber(true);
            setPhone(newInputValue);
            setEmail('');
        } else {
            setEmail(newInputValue);
        }
    };

    const handlePhone = event => {
        const newInputValue = event.target.value;
        setPhone(newInputValue);

        if (/^\d+$/.test(newInputValue) === false) {
            setIsPhoneNumber(false);
            setPutPassword(false);
            setPhone('');
            setEmail(newInputValue);
        }
    };

    const handleSelectChange = e => {
        // Obtener el prefijo de la lista
        const { countryCode, prefix } = supportPrefixPhone.find(
            item => item.country == e.target.getAttribute('value'),
        );

        setCountryValue(`${countryCode} ${prefix}`);
        setPhonePrefix(prefix);
    };

    const handleContinue = () => {
        setPutPassword(!isPhoneNumber);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setPutPassword(!isPhoneNumber && emailPattern.test(email));

        if (isPhoneNumber) {
            setShowPhoneCode(true);
        }

        loginHasProfileAction(email);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        loginAction(email, password);
    };

    const [emailCode, setEmailCode] = useState('');
    const emailCodeRef = useRef('');

    useEffect(() => {
        emailCodeRef.current = emailCode;

        if (emailCodeRef.current && emailCodeRef.current.length === 6) {
            const equal = verifyEmailCode(emailCodeRef.current);

            if (equal) {
                loginAction(email, password);
            }
        }
    }, [emailCode]);

    return (
        <section className="login-container">
            {sendCode && (
                <div className="login-verify">
                    <h3>Completa el proceso de verificación</h3>

                    <small>
                        Enviamos un código a{' '}
                        <span className="login-orange">{email}</span> Ingrésalo
                        a continuacion
                    </small>

                    <InputCode setCode={setEmailCode} />

                    <p>
                        Si no has recibido el código, comprueba tus carpetas de
                        correo no deseado y papelera
                    </p>

                    <p>{loginError}</p>
                </div>
            )}

            {!showPhoneCode && !sendCode && (
                <>
                    <div className="login-title">
                        <h3>Inicias sesión/Registrarse</h3>

                        <div className="login-row login-green">
                            <FaLock />
                            <small>Todos los datos se cifrarán</small>
                        </div>
                    </div>

                    <div className="login-row">
                        <div className="login-col">
                            <FaTruckFast size={42} className="icon" />
                            <p>
                                <strong>Envío gratis</strong>
                            </p>
                            <small>En todos los pedidos</small>
                        </div>

                        <div className="login-col">
                            <MdOutlineAssignmentReturn
                                size={42}
                                className="icon"
                            />
                            <p>
                                <strong>Devoluciones: 90 días</strong>
                            </p>
                            <small>Desde la fecha de compra</small>
                        </div>
                    </div>

                    <LoginForm
                        {...{
                            handleFormSubmit,
                            isPhoneNumber,
                            email,
                            phone,
                            handleEmail,
                            handlePhone,
                            handleSelectChange,
                            countryValue,
                            putPassword,
                            password,
                            setPassword,
                            handleContinue,
                            waitLogin,
                            loginError,
                            setShowLoginProblem,
                        }}
                    />

                    <p className="terms">
                        Al continuar, aceptas nuestros{' '}
                        <Link to="/terms-of-use">Términos de uso</Link> y{' '}
                        <Link to="/privacy-policy">Política de privacidad</Link>
                    </p>
                </>
            )}

            {showPhoneCode && (
                <PhoneCode phonePrefix={phonePrefix} phone={phone} />
            )}
        </section>
    );
};

export default Login;
