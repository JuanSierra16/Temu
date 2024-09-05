import {
    FaSearch,
    FaChevronDown,
    FaHeart,
    FaStar,
    FaRegUser,
} from 'react-icons/fa';
import { LuMessageCircle } from 'react-icons/lu';
import { AiFillLike } from 'react-icons/ai';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';

import { MenuItem, SubMenu } from '../elements/MenuItem.jsx';
import Login from '../widgets/Login.jsx';
import Modal from '../elements/Modal.jsx';
import './NavBar.css';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../provider/UserContext.jsx';
import UserMenu from './navbar/UserMenu.jsx';

const NavBar = () => {
    const [showLogin, setShowLogin] = useState(false);

    const { userIsLogin } = useContext(UserContext);

    useEffect(() => {
        if (userIsLogin) {
            setShowLogin(false);
        }
    }, [userIsLogin]);

    const navigation = [
        {
            name: 'Más vendidos',
            icon: <AiFillLike size={18} />,
            path: '#',
        },
        {
            name: '5 estrellas',
            icon: <FaStar size={18} />,
            path: '#',
        },
        {
            name: 'Amor y Amistad',
            icon: <FaHeart size={18} />,
            path: '#',
        },
        {
            name: 'Recién llegados',
            icon: null,
            path: '#',
        },
    ];

    const help = [
        { name: 'Centro de ayuda', path: '#' },
        { name: 'Centro de seguridad', path: '#' },
        { name: 'Chatea con temu', path: '#' },
        { name: 'Protección de compras de Temu', path: '#' },
        { name: 'Política de privacidad y cookies', path: '#' },
    ];

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container max-width">
                    <img src="/TemuLogo.png" alt="logo" className="logo" />

                    <ul>
                        {navigation.map((item, index) => (
                            <li key={index}>
                                <a href={item.path}>
                                    {item.icon}
                                    {item.name}
                                </a>
                            </li>
                        ))}

                        <li>
                            <MenuItem>
                                <div className="navbar-hover">
                                    Categorías
                                    <FaChevronDown />
                                </div>

                                <SubMenu></SubMenu>
                            </MenuItem>
                        </li>
                    </ul>

                    <div className="navbar-search">
                        <input type="text" placeholder="Buscar" />

                        <button>
                            <FaSearch size={18} />
                        </button>
                    </div>

                    <ul className="">
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

                        {userIsLogin && <UserMenu />}

                        <li>
                            <MenuItem>
                                <span className="navbar-hover">
                                    <LuMessageCircle size={20} />
                                    Ayuda
                                </span>

                                <SubMenu>
                                    <div className="help-sub-menu">
                                        {help.map(item => (
                                            <a href={item.path} key={item.name}>
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </SubMenu>
                            </MenuItem>
                        </li>

                        <li>
                            <MenuItem>
                                <span className="navbar-hover">
                                    <img
                                        src="/colombia-icon.png"
                                        alt=""
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                        }}
                                    />
                                    ES
                                </span>

                                <SubMenu>
                                    <div className="country-sub-menu">
                                        <label htmlFor="country-radio">
                                            Idioma
                                        </label>

                                        <span>
                                            <input
                                                name="country-radio"
                                                type="radio"
                                            />
                                            <small>Espanol-ES</small>
                                        </span>

                                        <hr />

                                        <small>Moneda</small>
                                        <small>Cop: $</small>

                                        <hr />

                                        <span>
                                            <img
                                                src="/colombia-icon.png"
                                                alt=""
                                            />

                                            <small>
                                                Estas comprando en Temu Colombia
                                            </small>
                                        </span>
                                    </div>
                                </SubMenu>
                            </MenuItem>
                        </li>

                        <li className="navbar-hover">
                            <MdOutlineLocalGroceryStore size={20} />
                        </li>
                    </ul>
                </div>
            </nav>

            <Modal show={showLogin} setShow={setShowLogin}>
                <Login clear={showLogin} />
            </Modal>
        </>
    );
};

export default NavBar;
