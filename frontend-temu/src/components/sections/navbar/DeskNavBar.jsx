import { FaSearch, FaChevronDown, FaHeart, FaStar } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';

import { MenuItem, SubMenu } from '../../elements/MenuItem';
import UserMenu from './UserMenu';
import Categories from '../../elements/category/Categories';

import './DeskNavBar.css';
import { Link } from 'react-router-dom';
import HelpMenu from './helpMenu';

const DeskNavBar = () => {
    const navigation = [
        {
            name: 'Más vendidos',
            icon: <AiFillLike size={18} />,
            path: '/MasVendidos',
        },
        {
            name: '5 estrellas',
            icon: <FaStar size={18} />,
            path: '/FiveStars',
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

    return (
        <nav className="navbar">
            <div className="navbar-container max-width">
                <Link to="/">
                    <img src="/TemuLogo.png" alt="logo" className="logo" />
                </Link>

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

                            <SubMenu>
                                <Categories />
                            </SubMenu>
                        </MenuItem>
                    </li>
                </ul>

                <div className="navbar-search">
                    <input type="text" placeholder="Buscar" />

                    <button>
                        <FaSearch size={18} />
                    </button>
                </div>

                <ul>
                    <UserMenu />
                    <HelpMenu />

                    <li className="navbar-hover">
                        <MdOutlineLocalGroceryStore size={20} />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default DeskNavBar;
