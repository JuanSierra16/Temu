import { FaHeart, FaStar, FaSearch, FaRegUser } from 'react-icons/fa';
import { LuMessageCircle } from 'react-icons/lu';
import { AiFillLike } from 'react-icons/ai';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';

import Login from '../widgets/Login.jsx';
import Modal from '../elements/Modal.jsx';
import Logo from '../../assets/TemuLogo.png';
import './NavBar.css';

import { useContext, useState } from 'react';
import { UserContext } from '../../provider/UserContext.jsx';

const NavBar = () => {
    const [showLogin, setShowLogin] = useState(false);

    const { userData, isUserLogin } = useContext(UserContext);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container max-width">
                    <img src={Logo} alt="logo" className="logo" />

                    <ul className="links">
                        <li>
                            <AiFillLike />
                            <a href="#">Más vendidos</a>
                        </li>

                        <li>
                            <FaStar />
                            <a href="#">5 estrellas</a>
                        </li>

                        <li>
                            <FaHeart />
                            <a href="#">Amor y Amistad</a>
                        </li>

                        <li>
                            <a href="#">Recién llegados</a>
                        </li>

                        <li>
                            <a href="#">Categorías</a>
                        </li>
                    </ul>

                    <div className="search">
                        <input type="text" placeholder="Buscar" />

                        <button>
                            <FaSearch />
                        </button>
                    </div>

                    <ul className="links">
                        {!isUserLogin && (
                            <li onClick={() => setShowLogin(true)}>
                                <a href="#" className="flex-row">
                                    <FaRegUser size={20} />

                                    <div className="flex-col align-start">
                                        <p>Iniciar sesión/Registra</p>
                                        <p>Pedidos y cuenta</p>
                                    </div>
                                </a>
                            </li>
                        )}

                        {isUserLogin && (
                            <li className="flex-row">
                                <a href="#">
                                    <FaRegUser size={20} />
                                    {userData.name}
                                    <p>Pedidos y cuenta</p>
                                </a>
                            </li>
                        )}

                        <li className="flex-row">
                            <LuMessageCircle size={20} />

                            <a href="#">Ayuda</a>
                        </li>

                        <li>
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
