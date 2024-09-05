import { FaSearch, FaChevronDown, FaHeart, FaStar } from 'react-icons/fa';
import { LuMessageCircle } from 'react-icons/lu';
import { AiFillLike } from 'react-icons/ai';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';

import { MenuItem, SubMenu } from '../../elements/MenuItem';
import UserMenu from './UserMenu';

import './DeskNavBar.css';

const DeskNavBar = () => {
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
                        <div className="navbar-menu">
                            {navigation.map((item, index) => (
                                <li key={index}>
                                    <a href={item.path}>
                                        {item.icon}
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </div>

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
                        <UserMenu />

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
                                                checked
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
        </>
    );
};

export default DeskNavBar;
