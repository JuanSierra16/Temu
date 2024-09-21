import { LuCreditCard, LuTicket } from 'react-icons/lu';
import { CgNotes, CgBox } from 'react-icons/cg';
import { MdOutlinePlace } from 'react-icons/md';
import { FaRegUser, FaRegClock } from 'react-icons/fa';
import { TbMessageStar, TbMessage2Pin, TbLogout2 } from 'react-icons/tb';
import {
    AiOutlineSafety,
    AiOutlinePropertySafety,
    AiOutlineUserSwitch,
} from 'react-icons/ai';

import { MenuItem, SubMenu } from '../../elements/MenuItem';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../provider/UserContext';
import Modal from '../../elements/Modal';
import Login from '../login/Login';
import LoginProblem from '../login/LoginProblem';
import ResetPassword from '../login/ResetPassword';

const UserMenu = () => {
    const submenu = [
        {
            name: 'Tus pedidos',
            icon: <CgNotes size={16} />,
            path: '#',
        },
        {
            name: 'Tus reseñas',
            icon: <TbMessageStar size={16} />,
            path: '#',
        },
        {
            name: 'Tu perfil',
            icon: <FaRegUser size={16} />,
            path: '#',
        },
        {
            name: 'Cupones y ofertas',
            icon: <LuTicket size={16} />,
            path: '#',
        },
        {
            name: 'Saldo de crédito',
            icon: <LuCreditCard size={16} />,
            path: '#',
        },
        {
            name: 'Proveedores seguidos',
            icon: <CgBox size={16} />,
            path: '#',
        },
        {
            name: 'Historial de navegación',
            icon: <FaRegClock size={16} />,
            path: '#',
        },
        {
            name: 'Direcciones',
            icon: <MdOutlinePlace size={16} />,
            path: '#',
        },
        {
            name: 'Seguridad de la cuenta',
            icon: <AiOutlineSafety size={16} />,
            path: '#',
        },
        {
            name: 'Permisos',
            icon: <AiOutlinePropertySafety size={16} />,
            path: '#',
        },
        {
            name: 'Notificaciones',
            icon: <TbMessage2Pin size={16} />,
            path: '#',
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLoginProblem, setShowLoginProblem] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const setBackRef = useRef(null);

    const { userData, userIsLogin, logoutAction } = useContext(UserContext);

    useEffect(() => {
        if (userIsLogin) {
            setShowModal(false);
            setShowLogin(false);
            setShowLoginProblem(false);
            setShowLoginProblem(false);
            setShowResetPassword(false);
        }
    }, [userIsLogin]);

    useEffect(() => {
        if (showModal) {
            setShowLogin(true);
            setShowLoginProblem(false);
        }
    }, [showModal]);

    useEffect(() => {
        if (showResetPassword) {
            setShowLogin(false);
            setShowLoginProblem(false);
        }
    }, [showResetPassword]);

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
    }, [showLoginProblem]);

    useEffect(() => {
        if (showLogin) {
            setBackRef.current = null;

            setShowLoginProblem(false);
            setShowResetPassword(false);
        }
    }, [showLogin]);

    return (
        <>
            <li>
                {!userIsLogin && (
                    <div
                        onClick={() => {
                            setShowModal(true);
                            setShowLogin(true);
                        }}
                    >
                        <div className="navbar-hover navbar-login">
                            <FaRegUser size={20} />

                            <div className="navbar-login-text">
                                <small>Iniciar sesión/Registra</small>
                                <small>
                                    <strong>Pedidos y cuenta</strong>
                                </small>
                            </div>
                        </div>
                    </div>
                )}

                {userIsLogin && (
                    <MenuItem>
                        <div className="navbar-hover navbar-login">
                            <FaRegUser size={20} />

                            <div className="navbar-login-text">
                                <small>Hola {userData?.username}</small>
                                <small>
                                    <strong>Pedidos y cuenta</strong>
                                </small>
                            </div>
                        </div>

                        <SubMenu>
                            <div className="login-sub-menu">
                                <a>
                                    <FaRegUser size={20} />
                                    {userData?.username}
                                </a>

                                <hr />

                                {submenu.map((item, index) => (
                                    <a key={index} href={item.path}>
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </a>
                                ))}

                                <hr />

                                <a href="#">
                                    <AiOutlineUserSwitch size={16} />
                                    <span>Cambiar cuenta</span>
                                </a>

                                <a href="#" onClick={logoutAction}>
                                    <TbLogout2 size={16} />
                                    <span>Cerrar sesión</span>
                                </a>
                            </div>
                        </SubMenu>
                    </MenuItem>
                )}
            </li>

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

                {showResetPassword && (
                    <ResetPassword setShowLogin={setShowLogin} />
                )}
            </Modal>
        </>
    );
};

export default UserMenu;
