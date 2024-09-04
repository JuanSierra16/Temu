// src/components/LoginModal.jsx
import { useContext, useEffect, useState } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaLock } from 'react-icons/fa';
import { FaXTwitter, FaTruckFast } from 'react-icons/fa6';
import { MdOutlineAssignmentReturn } from 'react-icons/md';

import { supportPrefixPhone } from '../../utils/data';

import Select from '../elements/Select';
import InputCode from '../elements/InputCode';
import { UserContext } from '../../provider/UserContext';
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
        <div className="login-container">
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

                    <form onSubmit={handleFormSubmit}>
                        <div className="login-input-container">
                            <label htmlFor="emailPhone">
                                Email o número de teléfono
                            </label>

                            {isPhoneNumber && (
                                <div className={`phone-input`}>
                                    <Select value={countryValue}>
                                        {supportPrefixPhone.map(
                                            ({ country, prefix }) => (
                                                <p
                                                    className="phone-select"
                                                    key={country}
                                                    value={country}
                                                    onClick={handleSelectChange}
                                                >
                                                    {country} {prefix}
                                                </p>
                                            ),
                                        )}
                                    </Select>

                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhone}
                                        disabled={waitLogin}
                                        required
                                        autoFocus
                                    />
                                </div>
                            )}

                            {!isPhoneNumber && (
                                <input
                                    name="emailPhone"
                                    type="email"
                                    value={email}
                                    disabled={waitLogin}
                                    required
                                    autoFocus
                                    onChange={handleEmail}
                                />
                            )}
                        </div>

                        {putPassword && (
                            <div className="login-input-container">
                                <label htmlFor="password">Contraseña</label>

                                <input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    disabled={waitLogin}
                                    required
                                    autoFocus
                                />

                                <a href="#" className="login-forgot">
                                    ¿Has olvidado tu contraseña?
                                </a>

                                {loginError && (
                                    <p className="login-error">{loginError}</p>
                                )}
                            </div>
                        )}

                        {!putPassword && (
                            <button
                                className="orange-button"
                                onClick={handleContinue}
                            >
                                Continuar
                            </button>
                        )}

                        {putPassword && (
                            <button
                                type="submit"
                                className="orange-button"
                                disabled={waitLogin}
                            >
                                Iniciar sesion
                            </button>
                        )}

                        <a href="#">¿Tienes problemas para iniciar sesión?</a>

                        <div className="login-col login-with">
                            <div className="login-row">
                                <hr />
                                <p>O continúa de otras maneras</p>
                                <hr />
                            </div>

                            <div className="login-row">
                                <FaGoogle size={32} />
                                <FaFacebook size={32} />
                                <FaApple size={32} />
                                <FaXTwitter size={32} />
                            </div>
                        </div>
                    </form>

                    <p className="terms">
                        Al continuar, aceptas nuestros{' '}
                        <a href="#">Términos de uso</a> y{' '}
                        <a href="#">Política de privacidad.</a>
                    </p>
                </>
            )}

            {showPhoneCode && (
                <div className="login-col">
                    <h3>Ingresa el código de verificación</h3>
                    <small>
                        Enviamos un código de verificación a{' '}
                        <span className="login-orange">
                            {phonePrefix} {}
                            {phone}
                        </span>
                    </small>

                    <div className="phone-code">
                        <InputCode />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
