import { createContext, useEffect, useState } from 'react';
import { login } from '../API/Login.API';
import Cookies from 'js-cookie';

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
    const [sessionJWTToken, setSessionJWTToken] = useState(null);

    useEffect(() => {
        const cookieValue = Cookies.get('token');

        if (cookieValue) {
            const { user, token } = JSON.parse(cookieValue);

            setUserData(user);
            setUserIsLogin(true);
            setSessionJWTToken(token);
        }
    }, []);

    const loginAction = async (email, password) => {
        setWaitLogin(true);

        try {
            const data = await login(email, password);
            setUserData(data.user);
            setUserIsLogin(true);
            setSessionJWTToken(data.token);

            Cookies.set(
                'token',
                JSON.stringify({ user: data.user, token: data.token }),
                { expires: 1 },
            );
        } catch (error) {
            console.log(error);
            setLoginError('Credenciales incorrectas');

            setUserData({
                id: '',
                username: '',
                email: '',
            });

            setUserIsLogin(false);

            setTimeout(() => {
                setLoginError(null);
            }, 5000);
        }

        setWaitLogin(false);
    };

    const logoutAction = () => {
        Cookies.remove('token');

        setUserData({
            id: '',
            username: '',
            email: '',
        });

        setUserIsLogin(false);
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                loginAction,
                logoutAction,
                loginError,
                userIsLogin,
                waitLogin,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
