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

import Login from '../widgets/Login.jsx';
import Modal from '../elements/Modal.jsx';
import './NavBar.css';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../provider/UserContext.jsx';

const NavBar = () => {
    const [showLogin, setShowLogin] = useState(false);

    const { userData, userIsLogin } = useContext(UserContext);

    useEffect(() => {
        if (userIsLogin) {
            setShowLogin(false);
        }
    }, [userIsLogin]);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container max-width">
                    <img src="/TemuLogo.png" alt="logo" className="logo" />

                    <ul>
                        <li>
                            <a href="#">
                                <AiFillLike size={18} />
                                Más vendidos
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <FaStar size={18} />5 estrellas
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <FaHeart size={18} />
                                Amor y Amistad
                            </a>
                        </li>

                        <li>
                            <a href="#">Recién llegados</a>
                        </li>

                        <li>
                            <a href="#">
                                Categorías
                                <FaChevronDown />
                            </a>
                        </li>
                    </ul>

                    <ul className="">
                        <div className="navbar-search">
                            <input type="text" placeholder="Buscar" />

                            <button>
                                <FaSearch size={18} />
                            </button>
                        </div>

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

                        {userIsLogin && (
                            <li>
                                <div className="navbar-hover navbar-login">
                                    <div className="login-text">
                                        <FaRegUser size={20} />
                                        {userData.username}
                                        <p>Pedidos y cuenta</p>
                                    </div>
                                </div>
                            </li>
                        )}

                        <li>
                            <div className="navbar-hover">
                                <LuMessageCircle size={20} />
                                Ayuda
                            </div>
                        </li>

                        <li className="navbar-hover">
                            <img
                                src="/colombia-icon.png"
                                alt=""
                                style={{ width: '20px', height: '20px' }}
                            />
                            ES
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
