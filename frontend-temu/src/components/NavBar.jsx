import React, { useState } from 'react';
import './NavBar.css';
import Logo from '../assets/TemuLogo.png'
import { FaSearch, FaRegUser } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { BsBagHeart } from "react-icons/bs";
import { MdOutlineLiveHelp } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Login from './Login';



const NavBar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleLoginOpen = () => {
        setIsLoginOpen(true);
    }

    const handleLoginClose = () => {
        setIsLoginOpen(false);
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar__logo">
                    <img src={Logo} alt="LogoTemu"/>
                </div>
                <div className="navbar__links">
                    <div className="navbar__link-item">
                        <BiLike />
                        <a href="#">Más vendidos</a>
                    </div>
                    <div className="navbar__link-item">
                        <FaRegStar />
                        <a href="#">5 estrellas</a>
                    </div>
                    <div className="navbar__link-item">
                        <BsBagHeart />
                        <a href="#">Amor y Amistad</a>
                    </div>
                    <div className="navbar__link-item">
                        <a href="#">Recién llegados</a>
                    </div>
                    <div className="navbar__link-item">
                        <a href="#">Categorías</a>
                    </div>
                </div>
                <div className="navbar__search">
                    <input type="text" placeholder="Buscar" />
                    <button>
                        <FaSearch />
                    </button>
                </div>
                <div className="navbar__icons">
                    <div className="navbar__actions-item">
                        <div onClick={handleLoginOpen}>
                            <FaRegUser />
                            <a href="#">Pedidos y cuenta</a>
                        </div>
                        <div className="navbar__action-item">
                            <MdOutlineLiveHelp />
                            <a href="#">Ayuda</a>
                        </div>
                        <div className='navbar__action-item'>
                            <a href="#"><img src="/path/to/flag-icon.png" alt="Idioma" /></a>
                        </div>
                        <div className="navbar__action-item">
                            <FaShoppingCart />
                        </div>
                    </div>
                </div>
            </nav>
            <Login isOpen={isLoginOpen} onClose={handleLoginClose} />
        </>
    );
};

export default NavBar;
