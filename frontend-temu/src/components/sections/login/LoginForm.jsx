import { FaXTwitter, FaFacebook, FaApple } from 'react-icons/fa6';
import { GoogleLogin } from '@react-oauth/google';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../provider/UserContext';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaTruckFast, FaLock } from 'react-icons/fa6';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import InputPhone from '../../elements/InputPhone';

const LoginForm = ({
    handleFormSubmit,
    isPhoneNumber,
    email,
    phone,
    setPhonePrefix,
    handleEmail,
    handlePhone,
    putPassword,
    password,
    setPassword,
    handleContinue,
    waitLogin,
    loginError,
    setShowLoginProblem,
    setForgotPassword,
}) => {
    const {
        loginGoogle,
        loginFacebook,
        loginErrorPlatform,
        setLoginError,
        noHasProfile,
    } = useContext(UserContext);

    useEffect(() => {
        setLoginError(null);
    }, [email, phone, setLoginError]);

    return (
        <>
            <div className="login-title">
                <h3>Iniciar sesión/Registrarse</h3>

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
                        <InputPhone
                            phone={phone}
                            onChangePhone={handlePhone}
                            setPrefix={setPhonePrefix}
                            disabled={waitLogin}
                            name="emailPhone"
                            required
                            autoFocus
                        />
                    )}

                    {!isPhoneNumber && (
                        <input
                            name="emailPhone"
                            type="email"
                            role="input-email"
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
                                role="input-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={waitLogin}
                                required
                                autoFocus
                            />

                            <div className="login-forgot">
                                <small
                                    className="login-forgot"
                                    onClick={() => setForgotPassword(true)}
                                >
                                    {' '}
                                    ¿Has olvidado tu contraseña?
                                </small>
                            </div>

                            {loginError && (
                                <p className="login-error" role='login-error'>{loginError}</p>
                            )}
                        </div>
                    )}

                    {!putPassword && (
                        <button
                            className="orange-button"
                            onClick={handleContinue}
                            disabled={waitLogin}
                            role="button-continue"
                        >
                            Continuar
                        </button>
                    )}

                    {putPassword && (
                        <button
                            type="submit"
                            className="orange-button"
                            disabled={waitLogin}
                            role="button-login"
                        >
                            {noHasProfile ? 'Registrarse' : 'Iniciar sesión'}
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
                <Link to="/terms-of-use" target="_blank">
                    Términos de uso
                </Link>{' '}
                y{' '}
                <Link to="/privacy-policy" target="_blank">
                    Política de privacidad
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
