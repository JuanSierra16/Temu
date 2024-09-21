import { FaXTwitter, FaFacebook, FaApple } from 'react-icons/fa6';
import Select from '../../elements/Select';
import { supportPrefixPhone } from '../../../utils/prefixPhone';
import { GoogleLogin } from '@react-oauth/google';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../provider/UserContext';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaTruckFast, FaLock } from 'react-icons/fa6';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { Link } from 'react-router-dom';

const LoginForm = ({
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
}) => {
    const { loginGoogle, loginFacebook, loginErrorPlatform, setLoginError } =
        useContext(UserContext);

    useEffect(() => {
        setLoginError(null);
    }, [email, phone, setLoginError]);

    return (
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
                    <MdOutlineAssignmentReturn size={42} className="icon" />
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

                <>
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
                            disabled={waitLogin}
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
                </>

                <article className="login-terms">
                    <small
                        className="login-small-link"
                        onClick={() => {
                            setShowLoginProblem(true);
                        }}
                    >
                        ¿Tienes problemas para iniciar sesión?
                    </small>
                </article>

                <div className="login-col login-with">
                    <div className="login-row">
                        <hr className="h-line" />
                        <p>O continúa de otras maneras</p>
                        <hr className="h-line" />
                    </div>

                    <div className="login-row">
                        <GoogleLogin
                            onSuccess={loginGoogle}
                            onError={loginErrorPlatform}
                            theme="outline"
                            type="icon"
                            shape="pill"
                        />

                        <FacebookLogin
                            appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                            onSuccess={loginFacebook}
                            onFail={loginErrorPlatform}
                            render={({ onClick }) => (
                                <FaFacebook
                                    size={32}
                                    onClick={onClick}
                                    className="facebook-button"
                                />
                            )}
                        />

                        <FaApple size={32} />
                        <FaXTwitter size={32} />
                    </div>
                </div>
            </form>

            <p className="terms">
                Al continuar, aceptas nuestros{' '}
                <Link to="/terms-of-use">Términos de uso</Link> y{' '}
                <Link to="/privacy-policy">Política de privacidad</Link>
            </p>
        </>
    );
};

export default LoginForm;
