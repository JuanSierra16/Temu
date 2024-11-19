import { FaSearch, FaChevronDown, FaHeart, FaStar } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';

import { MenuItem, SubMenu } from '../../elements/MenuItem';
import UserMenu from './UserMenu';
import Categories from '../../elements/category/Categories';

import './DeskNavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import HelpMenu from './helpMenu';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../provider/useTheme';

const DeskNavBar = () => {
    const [navigation, setNavigation] = useState([
        {
            name: 'Más vendidos',
            icon: <AiFillLike size={18} />,
            path: '/best-sellers',
        },
        {
            name: '5 estrellas',
            icon: <FaStar size={18} />,
            path: '/five-stars',
        },
        {
            name: 'Amor y Amistad',
            icon: <FaHeart size={18} />,
            path: '#',
        },
        {
            name: 'Recién llegados',
            icon: null,
            path: '/new-comers',
        },
    ]);

    const navbarRef = useRef(null);
    const lastScrollTop = useRef(0);

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const { theme } = useTheme();

    useEffect(() => {
        if (!theme) return;

        const newNavigation = [...navigation];
        newNavigation[2].name = theme.special_name;

        setNavigation(newNavigation);
    }, [theme, navigation]);

    const handleScroll = () => {
        let scrollTop = window.scrollY;

        if (scrollTop < lastScrollTop.current) {
            navbarRef.current.classList.add('navbar-sticky');
        } else {
            navbarRef.current.classList.remove('navbar-sticky');
        }

        lastScrollTop.current = scrollTop;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearch = () => {
        if (search) {
            navigate(`/search-product/${encodeURIComponent(search)}`);
        }

        setSearch('');
    };

    return (
        <nav className="navbar" ref={navbarRef}>
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
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <button onClick={handleSearch}>
                        <FaSearch size={18} />
                    </button>
                </div>

                <ul>
                    <UserMenu />
                    <HelpMenu />

                    <li className="navbar-hover">
                        <Link to="/cart">
                            <MdOutlineLocalGroceryStore size={20} />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default DeskNavBar;
