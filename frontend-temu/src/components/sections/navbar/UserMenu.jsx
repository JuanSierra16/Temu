import { LuTicket } from 'react-icons/lu';
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
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../provider/UserContext';
import Modal from '../../elements/Modal';
import Login from '../../widgets/Login';

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

    const [showLogin, setShowLogin] = useState(false);
    const { userData, userIsLogin } = useContext(UserContext);

    useEffect(() => {
        if (userIsLogin) {
            setShowLogin(false);
        }
    }, [userIsLogin]);

    return (
        <>
            <li>
                {!userIsLogin && (
                    <li onClick={() => setShowLogin(true)}>
                        <div className="navbar-hover navbar-login">
                            <FaRegUser size={20} />

                            <div className="navbar-login-text">
                                <small>Iniciar sesión/Registra</small>
                                <small>
                                    <strong>Pedidos y cuenta</strong>
                                </small>
                            </div>
                        </div>
                    </li>
                )}

                {userIsLogin && (
                    <div className="navbar-hover">
                        <MenuItem>
                            <div className="navbar-hover navbar-login">
                                <FaRegUser size={20} />

                                <div className="navbar-login-text">
                                    <small>Hola {userData.username}</small>
                                    <small>
                                        <strong>Pedidos y cuenta</strong>
                                    </small>
                                </div>
                            </div>

                            <SubMenu>
                                <div className="login-sub-menu">
                                    <a>
                                        <FaRegUser size={20} />
                                        {userData.username}
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

                                    <a href="#">
                                        <TbLogout2 size={16} />
                                        <span>Cerrar sesión</span>
                                    </a>
                                </div>
                            </SubMenu>
                        </MenuItem>
                    </div>
                )}
            </li>

            <Modal show={showLogin} setShow={setShowLogin}>
                <Login clear={showLogin} />
            </Modal>
        </>
    );
};

export default UserMenu;
