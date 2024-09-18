import { FaXTwitter, FaFacebook, FaApple } from 'react-icons/fa6';
import { IoChevronBackSharp } from "react-icons/io5";
import Select from '../../elements/Select';
import { supportPrefixPhone } from '../../../utils/data';
import { GoogleLogin } from '@react-oauth/google';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../../provider/UserContext';
import FacebookLogin from '@greatsumini/react-facebook-login';

import { useState } from 'react';

import Modal from '../../elements/Modal';

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
    const { loginGoogle, loginFacebook, loginErrorPlatform, setLoginError } =
        useContext(UserContext);

    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showisModalOpen, setShowIsModalOpen] = useState(false)
    
    useEffect(() => {
        setLoginError(null);
    }, [email, phone, setLoginError]);


    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

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
            <article
                className="login-terms" onClick={() => setShowFirstModal(true)}>
                <a href="#">¿Tienes problemas para iniciar sesión?</a>
            </article>

            <Modal show={showFirstModal} setShow={setShowFirstModal}>
                <div className='modal-header'>
                    <button className='back-buttom' onClick={() => setShowFirstModal(false)}>
                        <IoChevronBackSharp size={24} />
                    </button>
                    <h3>¿Tienes problemas para iniciar sesión?</h3>
                </div>
                <div className='modal-body'>
                    <p>
                        Si registraste una cuenta con tu dirección de email, pero olvidaste
                        tu contraseña, puedes restablecerla.
                    </p>
                    <button onClick={() => setShowIsModalOpen(true)}>Restablecer Contraseña</button>
                    <p>
                        Si olvidaste tu cuenta, puedes intentar encontrar tu cuenta por
                        email, número de teléfono celular o número de pedido.
                    </p>
                    <button className='modal-buttom'>Encontrar cuenta</button>
                </div>
            </Modal>

            <Modal show={showisModalOpen} setShow={setShowIsModalOpen}>
                <h2>Olvide mi contraseña</h2>
                <p>Ingresa tu dirección de email a continuación y te enviaremos un
                    código de 6 dígitos para el restablecimiento de tu contraseña.
                </p>
                <input type="email" placeholder='Dirección de email' />
                <button
                    onClick={() => setShowIsModalOpen(false)}
                    className='orange-button'>
                    Enviar
                </button>
            </Modal>
                    

            <div className="login-col login-with">
                <div className="login-row">
                    <hr />
                    <p>O continúa de otras maneras</p>
                    <hr />
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
    );
};

export default LoginForm;
