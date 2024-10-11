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
            path: '#',
        },
        {
            name: 'Saldo de crédito',
            icon: <LuCreditCard size={16} />,
            path: '#',
        },
        {
            name: 'Proveedores seguidos',
            icon: <CgBox size={16} />,
            path: '#',
        },
        {
            name: 'Historial de navegación',
            icon: <FaRegClock size={16} />,
            path: '#',
        },
        {
            name: 'Direcciones',
            icon: <MdOutlinePlace size={16} />,
            path: '#',
        },
        {
            name: 'Seguridad de la cuenta',
            icon: <AiOutlineSafety size={16} />,
            path: '#',
        },
        {
            name: 'Permisos',
            icon: <AiOutlinePropertySafety size={16} />,
            path: '#',
        },
        {
            name: 'Notificaciones',
            icon: <TbMessage2Pin size={16} />,
            path: '#',
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
                                        {item.icon}
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
