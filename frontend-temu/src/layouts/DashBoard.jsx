import './DashBoard.css';
import BlackBar from '../components/sections/BlackBar';
import Footer from '../components/sections/Footer';
import Navbar from '../components/sections/navbar/NavBar';
import { CgBox, CgNotes } from 'react-icons/cg';
import { TbMessage2Pin, TbMessageStar } from 'react-icons/tb';
import { FaRegClock, FaRegUser } from 'react-icons/fa';
import { LuCreditCard, LuTicket } from 'react-icons/lu';
import { MdOutlinePlace } from 'react-icons/md';
import { AiOutlinePropertySafety, AiOutlineSafety } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../provider/UserContext';
import { useContext, useEffect } from 'react';
import { CiCreditCard1 } from 'react-icons/ci';

const DashBoard = ({ children }) => {
    const submenu = [
        {
            name: 'Tus pedidos',
            icon: <CgNotes size={16} />,
            path: '/your-orders',
        },
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
            name: 'Cupones y ofertas',
            icon: <LuTicket size={16} />,
            path: '/coupons',
        },
        {
            name: 'Saldo de crédito',
            icon: <LuCreditCard size={16} />,
            path: '/credit-balance',
        },
        {
            name: 'Proveedores seguidos',
            icon: <CgBox size={16} />,
            path: '/followed-suppliers',
        },
        {
            name: 'Historial de navegación',
            icon: <FaRegClock size={16} />,
            path: '/history-navigation',
        },
        {
            name: 'Direcciones',
            icon: <MdOutlinePlace size={16} />,
            path: '/your-addresses',
        },
        {
            name: 'Métodos de pago',
            icon: <CiCreditCard1 size={16} />,
            path: '/payment-methods',
        },
        {
            name: 'Seguridad de la cuenta',
            icon: <AiOutlineSafety size={16} />,
            path: '/account-security',
        },
        {
            name: 'Permisos',
            icon: <AiOutlinePropertySafety size={16} />,
            path: '/permissions',
        },
        {
            name: 'Notificaciones',
            icon: <TbMessage2Pin size={16} />,
            path: '/notifications',
        },
    ];

    const { userIsLogin, waitLogin } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userIsLogin && !waitLogin) {
            navigate('/');
        }
    }, [userIsLogin, navigate, waitLogin]);

    return (
        <>
            <BlackBar />
            <Navbar />

            <main className="dashboard max-width">
                <article>
                    <section className="dashboard-nav">
                        <ul>
                            {submenu.map(item => (
                                <li key={item.name}>
                                    <Link to={item.path}>
                                        <span>{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </article>

                <article>{children}</article>
            </main>

            <Footer />
        </>
    );
};

export default DashBoard;
