import { FaHeadset, FaRegUser, FaList } from 'react-icons/fa';
import { TbLogout2, TbMessageStar } from 'react-icons/tb';
import { LuTicket } from 'react-icons/lu';
import { FiShoppingCart } from 'react-icons/fi';
import { CgNotes } from 'react-icons/cg';
import { MdOutlinePlace } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../provider/UserContext';
import { MenuItem, SubMenu } from '../../elements/MenuItem';
import Modal from '../../elements/Modal';

import Categories from '../../elements/category/Categories';
import { Link, useNavigate } from 'react-router-dom';
import ModalLogin from './ModalLogin';

import './MobileNavBar.css';
import { AiOutlinePropertySafety } from 'react-icons/ai';

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
            name: 'Permisos',
            icon: <AiOutlinePropertySafety size={24} />,
            path: '/permissions',
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
            name: 'Direcciones',
            icon: <MdOutlinePlace size={16} />,
            path: '/your-addresses',
        },
        {
            name: 'Atención al cliente',
            icon: <FaHeadset size={16} />,
            path: 'https://temu-097852.zapier.app',
        },
    ];

    const { userData, userIsLogin, logoutAction } = useContext(UserContext);
    const [showCategories, setShowCategories] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (userIsLogin) {
            setShowLogin(false);
        }
    }, [userIsLogin]);

    const handleSearch = () => {
        if (search) {
            navigate(`/search-product/${encodeURIComponent(search)}`);
        }

        setSearch('');
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

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
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
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
                                    <Link
                                        to="/profile"
                                        className="sub-menu-user"
                                    >
                                        <span>
                                            <FaRegUser size={20} />
                                        </span>
                                        {userData.username}
                                    </Link>
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
                                        <Link href="" onClick={logoutAction}>
                                            <TbLogout2 size={16} /> Cerrar
                                            sesión
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </SubMenu>
                    </MenuItem>

                    <li>
                        <Link to="/cart">
                            <FiShoppingCart size={20} />
                        </Link>
                    </li>
                </ul>
            </nav>

            <ModalLogin showModal={showLogin} setShowModal={setShowLogin} />
        </>
    );
};

export default MobileNavBar;
