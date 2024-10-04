import './SimpleNav.css';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const SimpleNav = () => {
    return (
        <nav className="simple-navbar">
            <div className="simple-navbar-container max-width">
                <div className="simple-navbar-item">
                    <Link to="/">
                        <img
                            src="/TemuLogo.png"
                            alt="logo"
                            className="simple-navbar-logo"
                        />
                    </Link>

                    <span className="simple-navbar-item simple-navbar-icon">
                        <FaLock size={32} />
                        <p>Todos los datos se cifrarán</p>
                    </span>
                </div>

                <UserMenu />
            </div>
        </nav>
    );
};

export default SimpleNav;
