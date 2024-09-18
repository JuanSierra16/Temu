import { createContext, useState, useEffect, useRef } from 'react';
import {
    login,
    loginWithPlatform,
    loginSendEmailCode,
    loginHasProfile,
} from '../API/Login.API';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        email: '',
    });

    const [loginError, setLoginError] = useState(null);
    const [userIsLogin, setUserIsLogin] = useState(false);
    const [waitLogin, setWaitLogin] = useState(false);
    const [sessionJWT, setSessionJWT] = useState(null);
    const [verifyCode, setVerifyCode] = useState('');
    const [noHasProfile, setNoHasProfile] = useState(false);
    const [sendCode, setSendCode] = useState(false);
    const [equalCode, setEqualCode] = useState(false);
    const equalCodeRef = useRef(false);

    useEffect(() => {
        const cookieValue = Cookies.get('token');

        if (cookieValue) {
            const { user, token } = JSON.parse(cookieValue);

            setUserData(user);
            setUserIsLogin(true);
            setSessionJWT(token);
        }
    }, []);

    const loginPlatform = async (
        id_usuario_plataforma,
        nombre_plataforma,
        username,
        email,
        errorMsg,
    ) => {
        try {
            const data = await loginWithPlatform(
                id_usuario_plataforma,
                'Google',
                username,
                email,
            );
            setUserData(data.user);
            setUserIsLogin(true);
            setSessionJWT(data.token);
            setLoginError(null);

            Cookies.set(
                'token',
                JSON.stringify({ user: data.user, token: data.token }),
                { expires: 1 },
            );
        } catch (error) {
            console.log(error);
            setLoginError(errorMsg);
            setUserIsLogin(false);
        }
    };

    const loginGoogle = async credentialResponse => {
        setWaitLogin(true);

        const { credential } = credentialResponse;
        const jwt = jwtDecode(credential);
        const { sub, name, email } = jwt;

        loginPlatform(
            sub,
            'Google',
            name,
            email,
            'Error en el inicio de sesión con Google',
        );
        setWaitLogin(false);
    };

    const loginFacebook = async response => {
        setWaitLogin(true);

        const { userID, email, name } = response;
        loginPlatform(userID, 'Facebook', name, email);

        setWaitLogin(false);
    };

    const loginErrorPlatform = () => {
        setLoginError('Error en el inicio de sesión');
    };

    const loginHasProfileAction = async email => {
        let hasProfile = null;

        try {
            const data = await loginHasProfile(email);
            hasProfile = data.exists;
            setNoHasProfile(!hasProfile);
        } catch (error) {
            setWaitLogin(false);
            setLoginError('Error no se pudo verificar el perfil');
        }
    };

    const loginSendEmailCodeAction = async email => {
        if (noHasProfile) {
            try {
                const code = await loginSendEmailCode(email);
                setVerifyCode(code.code);
            } catch (error) {
                setWaitLogin(false);
                setLoginError('Error no se pudo enviar código de verificación');
            }

            setWaitLogin(false);
        }
    };

    const loginAction = async (email, password) => {
        setWaitLogin(true);

        if (noHasProfile && !sendCode) {
            loginSendEmailCodeAction(email);
            setSendCode(true);
            setWaitLogin(false);
            return;
        }

        if (!equalCodeRef.current && sendCode) {
            setLoginError('El código no corresponde al enviado.');
            setWaitLogin(false);
            return;
        }

        try {
            const data = await login(email, password);
            setUserData(data.user);
            setUserIsLogin(true);
            setSessionJWT(data.token);
            setLoginError(null);

            Cookies.set(
                'token',
                JSON.stringify({ user: data.user, token: data.token }),
                { expires: 1 },
            );
        } catch (error) {
            console.log(error);
            setLoginError('Credenciales incorrectas');
            setUserIsLogin(false);

            setUserData({
                id: '',
                username: '',
                email: '',
            });
        }

        setWaitLogin(false);
    };

    const logoutAction = () => {
        Cookies.remove('token');

        if (userData?.nombre_plataforma === 'Google') {
            googleLogout();
        }

        setUserData({
            id: '',
            username: '',
            email: '',
        });

        setSessionJWT(null);
        setUserIsLogin(false);
        window.location.reload();
    };

    const verifyEmailCode = code => {
        const val = code === verifyCode;
        equalCodeRef.current = val;
        setEqualCode(val);

        console.log(val, code, verifyCode);

        if (!val) {
            setLoginError('Error el código de verificación no coincide');
        }

        return val;
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                loginAction,
                loginGoogle,
                loginFacebook,
                logoutAction,
                loginErrorPlatform,
                loginError,
                setLoginError,
                userIsLogin,
                waitLogin,
                noHasProfile,
                loginHasProfileAction,
                sendCode,
                verifyEmailCode,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
