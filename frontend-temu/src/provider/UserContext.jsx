import { createContext, useState, useEffect, useRef } from 'react';
import {
    login,
    loginWithPlatform,
    loginSendEmailCode,
    loginHasProfile,
    loginResetPassword,
} from '../API/Login.API';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

const UserContext = createContext(null);

const userDataInit = {
    id: '',
    username: '',
    email: '',
    password: '',
    created_at: '',
    id_usuario_plataforma: '',
    nombre_plataforma: '',
    phone_number: '',
    is_verified: '',
};

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(userDataInit);

    // login
    const [loginError, setLoginError] = useState(null);
    const [userIsLogin, setUserIsLogin] = useState(false);
    const [waitLogin, setWaitLogin] = useState(false);
    const [sessionJWT, setSessionJWT] = useState(null);
    const [noHasProfile, setNoHasProfile] = useState(false);

    // email código de verificación
    const [emailCode, setVerifyCode] = useState('');
    const [emailCodeSent, setEmailCodeSent] = useState(false);
    const equalEmailCodeRef = useRef(false);

    // reset password
    const [passwordCodeSent, setPasswordCodeSent] = useState(false);
    const [passwordCode, setPasswordCode] = useState('');
    const [equalPasswordCode, setEqualPasswordCode] = useState(false);

    // phone code
    const [phoneCodeSent, setPhoneCodeSent] = useState(false);
    const [phoneCode, setPhoneCode] = useState('');

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
                nombre_plataforma,
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
            setUserData(userDataInit);
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
        try {
            const data = await loginHasProfile(email);
            const hasProfile = data.exists;
            setNoHasProfile(!hasProfile);
        } catch (error) {
            setLoginError('La cuenta no existe.');
        }
    };

    const loginSendEmailCodeAction = async email => {
        setWaitLogin(true);

        if (noHasProfile) {
            try {
                const code = await loginSendEmailCode(email);
                setVerifyCode(code.code);
            } catch (error) {
                setWaitLogin(false);
                setLoginError('Error no se pudo enviar código de verificación');
            }
        }

        setWaitLogin(false);
    };

    const loginAction = async (email, password) => {
        setWaitLogin(true);

        // comprobar si tiene perfil, si no tiene envia código de verificación
        if (noHasProfile && !emailCodeSent) {
            loginSendEmailCodeAction(email);
            setEmailCodeSent(true);
            setWaitLogin(false);
            return;
        }

        // comprobar si el codigo enviado es valido
        if (!equalEmailCodeRef.current && emailCodeSent) {
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
            setUserData(userDataInit);
        }

        setWaitLogin(false);
    };

    const logoutAction = () => {
        Cookies.remove('token');

        if (userData?.nombre_plataforma === 'Google') {
            googleLogout();
        }

        setUserData(userDataInit);
        setSessionJWT(null);
        setUserIsLogin(false);
        window.location.reload();
    };

    const verifyEmailCode = code => {
        const isEqual = code === emailCode;
        equalEmailCodeRef.current = isEqual;

        if (!isEqual) {
            setLoginError('Error el código de verificación no coincide');
        }

        return isEqual;
    };

    const sendPasswordCode = async email => {
        setWaitLogin(true);

        try {
            const code = await loginSendEmailCode(email);
            setPasswordCode(code.code);
            setPasswordCodeSent(true);
        } catch (error) {
            setLoginError(
                'Error no se pudo enviar código de verificación para cambiar la contrasenya',
            );
        }

        setWaitLogin(false);
    };

    const isEqualPasswordCode = code => {
        const isEqual = code === passwordCode;
        setEqualPasswordCode(isEqual);

        if (!isEqual) {
            setLoginError('Error el código de verificación no coincide');
        } else {
            setLoginError(null);
        }

        return isEqual;
    };

    const resetPassword = async (email, newPassword) => {
        setWaitLogin(true);

        if (!equalPasswordCode && passwordCodeSent) {
            setLoginError('Error el código de verificación no coincide');
            return;
        }

        try {
            const data = await loginResetPassword(email, newPassword);
            setUserData(data.user);
            setUserIsLogin(true);
            setSessionJWT(data.token);

            Cookies.set(
                'token',
                JSON.stringify({ user: data.user, token: data.token }),
                { expires: 1 },
            );
        } catch (error) {
            console.error(error);
            setLoginError('Error no se pudo cambiar la contraseña');
        }

        setWaitLogin(false);
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
                emailCodeSent,
                verifyEmailCode,
                passwordCodeSent,
                sendPasswordCode,
                resetPassword,
                isEqualPasswordCode,
                equalPasswordCode,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
