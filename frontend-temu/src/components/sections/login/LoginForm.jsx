import { FaXTwitter, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa6';
import Select from '../../elements/Select';
import { supportPrefixPhone } from '../../../utils/data';

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
}) => {
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="login-input-container">
                <label htmlFor="emailPhone">Email o número de teléfono</label>

                {isPhoneNumber && (
                    <div className={`phone-input`}>
                        <Select value={countryValue}>
                            {supportPrefixPhone.map(({ country, prefix }) => (
                                <p
                                    className="phone-select"
                                    key={country}
                                    value={country}
                                    onClick={handleSelectChange}
                                >
                                    {country} {prefix}
                                </p>
                            ))}
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
                    <button className="orange-button" onClick={handleContinue}>
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
    );
};

export default LoginForm;
