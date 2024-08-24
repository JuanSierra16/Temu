// src/components/NavBar.jsx
import React from 'react';
import './NavBar.css'; // Asegúrate de crear y aplicar este archivo CSS
import Logo from '../assets/TemuLogo.png'
import { FaSearch } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { BsBagHeart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLiveHelp } from "react-icons/md";


const NavBar = () => {
    return (
        <nav className="navbar">
        <div className="navbar__logo">
            <img src={Logo} alt="LogoTemu"/>
        </div>
        <div className="navbar__links">
            <div className='MasVendidos'>
                <BiLike />
                <a href="#">Más vendidos</a>
            </div>
            <div>
                <FaRegStar />
                <a href="#">5 estrellas</a>
            </div>
            <div>
                <BsBagHeart />
                <a href="#">Amor y Amistad</a>
            </div>
            <div>
                <a href="#">Recién llegados</a>
            </div>
            <div>
                <a href="#">Categorías</a>
            </div>
            
        </div>
        <div className="navbar__search">
            <input type="text" placeholder="Buscar" />
            <button>
                <FaSearch />
            </button>
        </div>
        <div className="navbar__actions">
            <div>
                <FaRegUser />
                <a href="#">Pedidos y cuenta</a>
            </div>
            <div>
                <MdOutlineLiveHelp />
                <a href="#">Ayuda</a>
            </div>
            <a href="#"><img src="/path/to/flag-icon.png" alt="Idioma" /></a>
            <a href="#"><img src="/path/to/cart-icon.png" alt="Carrito" /></a>
        </div>
        </nav>
    );
};

export default NavBar;
