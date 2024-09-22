import Modal from '../../elements/Modal';
import Login from '../login/Login';
import LoginProblem from '../login/LoginProblem';
import ResetPassword from '../login/ResetPassword';

import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../provider/UserContext';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { FaTruckFast } from 'react-icons/fa6';

const ModalLogin = ({ showModal, setShowModal }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showLoginProblem, setShowLoginProblem] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [confirmCloseModal, setConfirmCloseModal] = useState(false);
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

    const handleCloseModal = value => {
        if (!value && showLogin && showModal) {
            setConfirmCloseModal(true);
        } else {
            setShowModal(false);
        }
    };

    return (
        <>
            <Modal
                show={showModal}
                setShow={handleCloseModal}
                setBack={setBackRef.current}
            >
                {showLogin && showModal && (
                    <Login setShowLoginProblem={setShowLoginProblem} />
                )}

                {showLoginProblem && (
                    <LoginProblem setShowResetPassword={setShowResetPassword} />
                )}

                {showResetPassword && (
                    <ResetPassword setShowLogin={setShowLogin} />
                )}
            </Modal>

            <Modal show={confirmCloseModal} setShow={setConfirmCloseModal}>
                <div className="login-col login-confirm-close">
                    <p>
                        <strong>
                            ¡Disfruta de ofertas especiales después de iniciar
                            sesión! ¿Estás seguro de que deseas salir?
                        </strong>
                    </p>

                    <div className="login-row">
                        <div className="login-col">
                            <FaTruckFast size={42} className="icon" />
                            <p>
                                <strong>Envío gratis</strong>
                            </p>
                            <small>En todos los pedidos</small>
                        </div>

                        <div className="login-col">
                            <MdOutlineAssignmentReturn
                                size={42}
                                className="icon"
                            />
                            <p>
                                <strong>Devoluciones: 90 días</strong>
                            </p>
                            <small>Desde la fecha de compra</small>
                        </div>
                    </div>

                    <div className="login-row">
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setConfirmCloseModal(false);
                            }}
                        >
                            Salir
                        </button>

                        <button
                            onClick={() => setConfirmCloseModal(false)}
                            className="orange-button"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalLogin;
