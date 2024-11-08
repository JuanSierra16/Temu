import { createContext, useState, useEffect, useRef } from 'react';
import {
    login,
    loginWithPlatform,
    loginSendEmailCode,
    loginHasProfile,
    loginResetPassword,
    sendVerificationCodeSMS,
    loginWithPhoneNumber,
    findAccountByEmail,
    findAccountByPhoneNumber,
    updateUserDetails,
} from '../API/Login.API';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

const UserContext = createContext(null);

const userDataInit = {
    id: '',
    id_usuario_plataforma: '',
    nombre_plataforma: '',
    username: '',
    email: '',
    phone_number: '',
    is_verified: false,
    created_at: '',
    medidas: {},
};

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(userDataInit);

    // login
    const [loginError, setLoginError] = useState(null);
    const [userIsLogin, setUserIsLogin] = useState(false);
    const [waitLogin, setWaitLogin] = useState(true);
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
    const [equalPhoneCode, setEqualPhoneCode] = useState(false);

    useEffect(() => {
        setWaitLogin(true);
        const cookieValue = Cookies.get('token');

        if (cookieValue) {
            const { user, token } = JSON.parse(cookieValue);

            setUserData(user);
            setUserIsLogin(true);
            setSessionJWT(token);
        }

        setWaitLogin(false);
    }, []);

    const saveCookies = (user, token) => {
        Cookies.set('token', JSON.stringify({ user: user, token: token }), {
            expires: 1,
        });
    };

    const loginPlatform = async (
        id_usuario_plataforma,
        nombre_plataforma,
        username,
        email,
        errorMsg,
    ) => {
        setLoginError(null);

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
            saveCookies(data.user, data.token);
        } catch (error) {
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
        setLoginError(null);

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
        setLoginError(null);

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
        setLoginError(null);

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
            saveCookies(data.user, data.token);
        } catch (error) {
            setLoginError('Credenciales incorrectas');
            setUserIsLogin(false);
            setUserData(userDataInit);
        }

        setWaitLogin(false);
    };

    const logoutAction = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        localStorage.removeItem('cart');

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
        setLoginError(null);

        if (!isEqual) {
            setLoginError('Error el código de verificación no coincide');
        }

        return isEqual;
    };

    const sendPasswordCode = async email => {
        setWaitLogin(true);
        setLoginError(null);

        try {
            const code = await loginSendEmailCode(email);
            setPasswordCode(code.code);
            setPasswordCodeSent(true);
        } catch (error) {
            setLoginError(
                'Error no se pudo enviar código de verificación para cambiar la contraseña',
            );
        }

        setWaitLogin(false);
    };

    const isEqualPasswordCode = code => {
        const isEqual = code === passwordCode;
        setEqualPasswordCode(isEqual);
        setLoginError(null);

        if (!isEqual) {
            setLoginError('Error el código de verificación no coincide');
        }

        return isEqual;
    };

    const resetPassword = async (email, newPassword) => {
        setWaitLogin(true);
        setLoginError(null);

        if (!equalPasswordCode && passwordCodeSent) {
            setLoginError('Error el código de verificación no coincide');
            return;
        }

        try {
            const data = await loginResetPassword(email, newPassword);
            setUserData(data.user);
            setUserIsLogin(true);
            setSessionJWT(data.token);
            saveCookies(data.user, data.token);
        } catch (error) {
            setLoginError('Error no se pudo cambiar la contraseña');
        }

        setWaitLogin(false);
    };

    const sendSMSCode = async phoneNumber => {
        setWaitLogin(true);
        setLoginError(null);

        try {
            const code = await sendVerificationCodeSMS(phoneNumber);
            setPhoneCode(code.code);
            setPhoneCodeSent(true);
        } catch (error) {
            setLoginError('Error no se pudo enviar código de verificación');
        }

        setWaitLogin(false);
    };

    const loginWithPhone = async (code, phoneNumber) => {
        setWaitLogin(true);
        setLoginError(null);

        const isEqual = code === phoneCode;
        setEqualPhoneCode(isEqual);

        if (!isEqual) {
            setLoginError('Error el código de verificación no coincide');
        } else {
            const data = await loginWithPhoneNumber(phoneNumber);
            setUserData(data.user);
            setUserIsLogin(true);
            setSessionJWT(data.token);
            saveCookies(data.user, data.token);
        }

        setWaitLogin(false);
    };

    const findAccountWithEmail = async email => {
        setWaitLogin(true);
        setLoginError(null);
        let res = null;
        const data = {
            username: null,
            email: null,
            nombre_plataforma: null,
            phone_number: null,
            message: null,
        };

        try {
            res = await findAccountByEmail(email);

            if (res.status === 404) {
                data.message = 'Cuenta no encontrada';
            } else if (res.status === 200) {
                data.username = res.data.user.username;
                data.email = res.data.user.email;
                data.nombre_plataforma = res.data.user.nombre_plataforma;
                data.phone_number = res.data.user.phone_number;
                data.message = 'Cuenta encontrada';
            }
        } catch (error) {
            setLoginError('Error no se pudo encontrar la cuenta');
        }

        setWaitLogin(false);
        return data;
    };

    const findAccountWithPhoneNumber = async phoneNumber => {
        setWaitLogin(true);
        setLoginError(null);
        let res = null;
        const data = {
            username: null,
            email: null,
            nombre_plataforma: null,
            phone_number: null,
            message: null,
        };

        try {
            res = await findAccountByPhoneNumber(phoneNumber);

            if (res.status === 404) {
                data.message = 'Cuenta no encontrada';
            } else if (res.status === 200) {
                data.username = res.data.user.username;
                data.email = res.data.user.email;
                data.phone_number = res.data.user.phone_number;
                data.nombre_plataforma = res.data.user.nombre_plataforma;
                data.message = 'Cuenta encontrada';
            }
        } catch (error) {
            setLoginError('Error no se pudo encontrar la cuenta');
        }

        setWaitLogin(false);
        return data;
    };

    const updateSizeMeasurements = async (
        username,
        medida_pecho,
        medida_cintura,
        medida_cadera,
        estatura,
        peso,
        unidad_medida,
    ) => {
        setLoginError(null);

        const success = await updateUserDetails(
            userData.id,
            username,
            medida_pecho,
            medida_cintura,
            medida_cadera,
            estatura,
            peso,
            unidad_medida,
        );

        if (!success) {
            setLoginError('Error no se pudo actualizar los datos');
        } else {
            setLoginError(null);
            const newUserData = { ...userData };
            newUserData.username = username;
            newUserData.medidas.medida_pecho = medida_pecho;
            newUserData.medidas.medida_cintura = medida_cintura;
            newUserData.medidas.medida_cadera = medida_cadera;
            newUserData.medidas.estatura = estatura;
            newUserData.medidas.peso = peso;
            newUserData.medidas.unidad_medida = unidad_medida;
            setUserData(newUserData);
            saveCookies(newUserData, sessionJWT);
        }
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
                sendSMSCode,
                loginWithPhone,
                phoneCodeSent,
                findAccountWithEmail,
                findAccountWithPhoneNumber,
                updateSizeMeasurements,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
