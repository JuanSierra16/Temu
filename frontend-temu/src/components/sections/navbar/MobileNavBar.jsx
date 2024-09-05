import { FaHeadset, FaRegUser, FaList, FaRegClock } from 'react-icons/fa';
import { TbLogout2, TbMessageStar } from 'react-icons/tb';
import { LuCreditCard, LuTicket } from 'react-icons/lu';
import { FiShoppingCart } from 'react-icons/fi';
import { CgBox, CgNotes } from 'react-icons/cg';
import { MdOutlinePlace } from 'react-icons/md';
import { RiSettingsLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';

import { useContext } from 'react';
import { UserContext } from '../../../provider/UserContext';
import { MenuItem, SubMenu } from '../../elements/MenuItem';

import './MobileNavBar.css';

const MobileNavBar = () => {
    const submenuCol = [
        { name: 'Tus pedidos', icon: <CgNotes size={24} />, path: '#' },
        { name: 'Cupones y ofertas', icon: <LuTicket size={24} />, path: '#' },
        {
            name: 'Saldo de crédito',
            icon: <LuCreditCard size={24} />,
            path: '#',
        },
    ];

    const submenu = [
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
            name: 'Atención al cliente',
            icon: <FaHeadset size={16} />,
            path: '#',
        },
        {
            name: 'Configuración',
            icon: <RiSettingsLine size={16} />,
            path: '#',
        },
        {
            name: 'Cerrar sesión',
            icon: <TbLogout2 size={16} />,
            path: '#',
        },
    ];

    const { userData, userIsLogin } = useContext(UserContext);

    return (
        <nav className="mobile-navbar">
            <img src="/temu.svg" alt="" className="logo" />

            <div className="mobile-navbar-search">
                <span>
                    <CiSearch />
                </span>
                <input type="text" placeholder="Buscar..." />
            </div>

            <ul className="mobile-navbar-icons">
                <li>
                    <FaList size={20} />
                </li>

                <MenuItem>
                    <FaRegUser size={20} />

                    <SubMenu>
                        <div className="mobile-navbar-sub-menu">
                            {!userIsLogin && (
                                <button className="orange-button">
                                    INICIAR SESIÓN/REGISTRARSE
                                </button>
                            )}

                            {userIsLogin && (
                                <a href="#" className="sub-menu-user">
                                    <span>
                                        <FaRegUser size={20} />
                                    </span>
                                    {userData.username}
                                </a>
                            )}

                            <div className="sub-menu-list">
                                {submenuCol.map(item => (
                                    <a href={item.path} key={item.name}>
                                        <span>{item.icon}</span>
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                            <div className="sub-menu-list-row">
                                {submenu.map(item => (
                                    <a href={item.path} key={item.name}>
                                        {item.icon}
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </SubMenu>
                </MenuItem>

                <li>
                    <FiShoppingCart size={20} />
                </li>
            </ul>
        </nav>
    );
};

export default MobileNavBar;