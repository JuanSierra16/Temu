import { useContext, useEffect, useRef, useState } from 'react';
import { supportPrefixPhone } from '../../../utils/prefixPhone';
import { UserContext } from '../../../provider/UserContext';
import LoginForm from './LoginForm';
import PhoneCode from './PhoneCode';
import './Login.css';
import LoginVerify from './LoginVerify';

/* toda la lógica para realizar el login
enviar el email
código de verificación
olvido de contraseña
buscar cuenta */

const Login = ({ setShowLoginProblem }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phonePrefix, setPhonePrefix] = useState('');
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [putPassword, setPutPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [countryValue, setCountryValue] = useState('');
    const [showPhoneCode, setShowPhoneCode] = useState(false);
    const [emailCode, setEmailCode] = useState('');
    const emailCodeRef = useRef('');

    const {
        loginAction,
        waitLogin,
        loginError,
        loginHasProfileAction,
        emailCodeSent,
        verifyEmailCode,
    } = useContext(UserContext);

    useEffect(() => {
        // por defecto el primer prefijo de la lista
        const { countryCode, prefix } = supportPrefixPhone[0];
        setCountryValue(`${countryCode} ${prefix}`);
        setPhonePrefix(prefix);
    }, []);

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
        // Obtener el prefijo de número de teléfono seleccionado de la lista
        const { countryCode, prefix } = supportPrefixPhone.find(
            item => item.country == e.target.getAttribute('value'),
        );

        setCountryValue(`${countryCode} ${prefix}`);
        setPhonePrefix(prefix);
    };

    const handleContinue = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmail = !isPhoneNumber && emailPattern.test(email);

        setPutPassword(validEmail);

        if (validEmail) {
            loginHasProfileAction(email);
        } else {
            setShowPhoneCode(true);
        }
    };

    const handleFormSubmit = event => {
        // login o enviar código de verificación al email
        event.preventDefault();
        loginAction(email, password);
    };

    useEffect(() => {
        // comprobara código de verificación y realizar el registro de usuario
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
            {!showPhoneCode && !emailCodeSent && (
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
            )}

            {emailCodeSent && (
                <LoginVerify email={email} setEmailCode={setEmailCode} />
            )}

            {showPhoneCode && (
                <PhoneCode phonePrefix={phonePrefix} phone={phone} />
            )}
        </section>
    );
};

export default Login;
