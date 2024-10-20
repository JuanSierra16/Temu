import { LuCreditCard, LuTicket } from 'react-icons/lu';
import { CgNotes, CgBox } from 'react-icons/cg';
import { MdOutlinePlace } from 'react-icons/md';
import { FaRegUser, FaRegClock } from 'react-icons/fa';
import { TbMessageStar, TbMessage2Pin, TbLogout2 } from 'react-icons/tb';
import { AiOutlineSafety, AiOutlinePropertySafety } from 'react-icons/ai';
import { MenuItem, SubMenu } from '../../elements/MenuItem';
import { useContext, useState } from 'react';
import { UserContext } from '../../../provider/UserContext';
import ModalLogin from './ModalLogin';
import { Link } from 'react-router-dom';

const UserMenu = () => {
    const submenu = [
        {
            name: 'Tus pedidos',
            icon: <CgNotes size={16} />,
            path: '/your-orders',
        },
        {
            name: 'Tus reseñas',
            icon: <TbMessageStar size={16} />,
            path: '/your-reviews',
        },
        {
            name: 'Tu perfil',
            icon: <FaRegUser size={16} />,
            path: '/profile',
        },
        {
            name: 'Cupones y ofertas',
            icon: <LuTicket size={16} />,
            path: '/coupons',
        },
        {
            name: 'Saldo de crédito',
            icon: <LuCreditCard size={16} />,
            path: '/credit-balance',
        },
        {
            name: 'Proveedores seguidos',
            icon: <CgBox size={16} />,
            path: '/followed-suppliers',
        },
        {
            name: 'Historial de navegación',
            icon: <FaRegClock size={16} />,
            path: '/history-navigation',
        },
        {
            name: 'Direcciones',
            icon: <MdOutlinePlace size={16} />,
            path: '/your-addresses',
        },
        {
            name: 'Seguridad de la cuenta',
            icon: <AiOutlineSafety size={16} />,
            path: '/account-security',
        },
        {
            name: 'Permisos',
            icon: <AiOutlinePropertySafety size={16} />,
            path: '/permissions',
        },
        {
            name: 'Notificaciones',
            icon: <TbMessage2Pin size={16} />,
            path: '/notifications',
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const { userData, userIsLogin, logoutAction } = useContext(UserContext);

    return (
        <>
            <li>
                {!userIsLogin && (
                    <div
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        <div className="navbar-hover navbar-login">
                            <FaRegUser size={20} />

                            <div className="navbar-login-text">
                                <small>Iniciar sesión/Registrarse</small>
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
                                <small role="username">
                                    Hola {userData?.username}
                                </small>
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
                                    <Link key={index} to={item.path}>
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                ))}

                                <hr />

                                <Link href="#" onClick={logoutAction}>
                                    <TbLogout2 size={16} />
                                    <span>Cerrar sesión</span>
                                </Link>
                            </div>
                        </SubMenu>
                    </MenuItem>
                )}
            </li>

            <ModalLogin showModal={showModal} setShowModal={setShowModal} />
        </>
    );
};

export default UserMenu;
