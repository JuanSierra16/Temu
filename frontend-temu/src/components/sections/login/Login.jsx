import { useContext, useEffect, useState } from 'react';
import { FaTruckFast, FaLock } from 'react-icons/fa6';
import { MdOutlineAssignmentReturn } from 'react-icons/md';

import { supportPrefixPhone } from '../../../utils/data';
import { UserContext } from '../../../provider/UserContext';
import LoginForm from './LoginForm';
import PhoneCode from './PhoneCode';
import './Login.css';

const Login = ({ clear }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phonePrefix, setPhonePrefix] = useState('');
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [putPassword, setPutPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [countryValue, setCountryValue] = useState('');
    const [showPhoneCode, setShowPhoneCode] = useState(false);

    const { loginAction, waitLogin, loginError } = useContext(UserContext);

    useEffect(() => {
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
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        loginAction(email, password);
    };

    return (
        <section className="login-container">
            {!showPhoneCode && (
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
                        }}
                    />

                    <p className="terms">
                        Al continuar, aceptas nuestros{' '}
                        <a href="#">Términos de uso</a> y{' '}
                        <a href="#">Política de privacidad.</a>
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
