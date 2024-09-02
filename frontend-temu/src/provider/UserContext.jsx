import { createContext, useEffect, useState } from 'react';
import { login } from '../API/Login.API';

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

    const loginAction = async (email, password) => {
        setWaitLogin(true);

        try {
            const data = await login(email, password);
            setUserData(data.user);
            setUserIsLogin(true);
        } catch (error) {
            setUserData(null);
            setUserIsLogin(false);
            setLoginError('Credenciales incorrectas');

            setTimeout(() => {
                setLoginError(null);
            }, 5000);
        }

        setWaitLogin(false);
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                loginAction,
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
