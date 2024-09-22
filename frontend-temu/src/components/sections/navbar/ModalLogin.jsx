import Modal from '../../elements/Modal';
import Login from '../login/Login';
import LoginProblem from '../login/LoginProblem';
import ResetPassword from '../login/ResetPassword';

import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../provider/UserContext';

const ModalLogin = ({ showModal, setShowModal }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showLoginProblem, setShowLoginProblem] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const setBackRef = useRef(null);

    const { userIsLogin } = useContext(UserContext);

    useEffect(() => {
        if (userIsLogin) {
            setShowModal(false);
            setShowLogin(false);
            setShowLoginProblem(false);
            setShowLoginProblem(false);
            setShowResetPassword(false);
        }
    }, [userIsLogin, setShowModal, setShowLogin]);

    useEffect(() => {
        if (showModal) {
            setShowLogin(true);
            setShowLoginProblem(false);
        }
    }, [showModal, setShowLogin]);

    useEffect(() => {
        if (showResetPassword) {
            setShowLogin(false);
            setShowLoginProblem(false);
        }
    }, [showResetPassword, setShowLogin]);

    useEffect(() => {
        if (showLoginProblem) {
            setBackRef.current = value => {
                if (value) {
                    setShowLogin(true);
                    setShowLoginProblem(false);
                    setShowResetPassword(false);
                }
            };

            setShowLogin(false);
        }
    }, [showLoginProblem, setShowLogin]);

    useEffect(() => {
        if (showLogin) {
            setBackRef.current = null;

            setShowLoginProblem(false);
            setShowResetPassword(false);
        }
    }, [showLogin]);

    return (
        <Modal
            show={showModal}
            setShow={setShowModal}
            setBack={setBackRef.current}
        >
            {showLogin && showModal && (
                <Login setShowLoginProblem={setShowLoginProblem} />
            )}

            {showLoginProblem && (
                <LoginProblem setShowResetPassword={setShowResetPassword} />
            )}

            {showResetPassword && <ResetPassword setShowLogin={setShowLogin} />}
        </Modal>
    );
};

export default ModalLogin;
