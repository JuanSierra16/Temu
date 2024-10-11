import { FaHeadset, FaRegUser, FaList, FaRegClock } from 'react-icons/fa';
import { TbLogout2, TbMessageStar } from 'react-icons/tb';
import { LuCreditCard, LuTicket } from 'react-icons/lu';
import { FiShoppingCart } from 'react-icons/fi';
import { CgBox, CgNotes } from 'react-icons/cg';
import { MdOutlinePlace } from 'react-icons/md';
import { RiSettingsLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';

import { useContext, useState } from 'react';
import { UserContext } from '../../../provider/UserContext';
import { MenuItem, SubMenu } from '../../elements/MenuItem';
import Modal from '../../elements/Modal';

import Categories from '../../elements/category/Categories';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';

import './MobileNavBar.css';

const MobileNavBar = () => {
    const submenuCol = [
        {
            name: 'Tus pedidos',
            icon: <CgNotes size={24} />,
            path: '/your-orders',
        },
        {
            name: 'Cupones y ofertas',
            icon: <LuTicket size={24} />,
            path: '/coupons',
        },
        {
            name: 'Saldo de crédito',
            icon: <LuCreditCard size={24} />,
            path: '/credit-balance',
        },
    ];

    const submenu = [
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
            name: 'Atención al cliente',
            icon: <FaHeadset size={16} />,
            path: '#',
        },
        {
            name: 'Configuración',
            icon: <RiSettingsLine size={16} />,
            path: '#',
        },
    ];

    const { userData, userIsLogin, logoutAction } = useContext(UserContext);
    const [showCategories, setShowCategories] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <nav className="mobile-navbar">
                <Link to="/">
                    <img src="/temu.svg" alt="" className="logo" />
                </Link>

                <div className="mobile-navbar-search">
                    <span>
                        <CiSearch />
                    </span>
                    <input type="text" placeholder="Buscar..." />
                </div>

                <ul className="mobile-navbar-icons">
                    <li>
                        <FaList
                            size={20}
                            onClick={() => setShowCategories(!showCategories)}
                        />

                        <Modal
                            show={showCategories}
                            setShow={setShowCategories}
                        >
                            <Categories />
                        </Modal>
                    </li>

                    <MenuItem>
                        <FaRegUser size={20} />

                        <SubMenu>
                            <div className="mobile-navbar-sub-menu">
                                {!userIsLogin && (
                                    <button
                                        className="orange-button"
                                        onClick={() => setShowLogin(true)}
                                    >
                                        INICIAR SESIÓN/REGISTRARSE
                                    </button>
                                )}

                                {userIsLogin && (
                                    <a href="#" className="sub-menu-user">
                                        <span>
                                            <FaRegUser size={20} />
                                        </span>
                                        {userData?.username}
                                    </a>
                                )}

                                <div className="sub-menu-list">
                                    {submenuCol.map(item => (
                                        <Link to={item.path} key={item.name}>
                                            <span>{item.icon}</span>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className="sub-menu-list-row">
                                    {submenu.map(item => (
                                        <Link to={item.path} key={item.name}>
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    ))}

                                    {userIsLogin && (
                                        <a href="" onClick={logoutAction}>
                                            <TbLogout2 size={16} /> Cerrar
                                            sesión
                                        </a>
                                    )}
                                </div>
                            </div>
                        </SubMenu>
                    </MenuItem>

                    <li>
                        <FiShoppingCart size={20} />
                    </li>
                </ul>
            </nav>

            <ModalLogin
                showModal={showLogin && !userIsLogin}
                setShowModal={setShowLogin}
            />
        </>
    );
};

export default MobileNavBar;
