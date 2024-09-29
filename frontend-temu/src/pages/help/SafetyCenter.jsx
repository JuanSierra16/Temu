import './SafetyCenter.css';
import BlackBar from '../../components/sections/BlackBar';
import Footer from '../../components/sections/Footer';
import NavBar from '../../components/sections/navbar/NavBar';
import { FaLock } from 'react-icons/fa';
import { FaUserCircle, FaChevronRight } from 'react-icons/fa';
import { BsCartCheckFill } from 'react-icons/bs';
import { TiWarning } from 'react-icons/ti';
import {
    BiSolidMessageRoundedError,
    BiSolidMessageAltError,
} from 'react-icons/bi';

import safetyCenterImg from '../../assets/safety-center.webp';

const SafetyCenter = () => {
    const safeInformation = [
        {
            icon: <FaLock size={32} />,
            title: 'Protege tus datos',
        },
        {
            icon: <FaUserCircle size={32} />,
            title: 'Protege tu cuenta',
        },
        {
            icon: <BsCartCheckFill size={32} />,
            title: 'Protege tu pago',
        },
    ];

    const safeScammers = [
        {
            icon: <TiWarning size={32} />,
            title: 'Reconoce estafas',
        },
        {
            icon: <BiSolidMessageAltError size={32} />,
            title: 'Reconoce fraudulentos',
        },
        {
            icon: <BiSolidMessageRoundedError size={32} />,
            title: 'Reconoce mensajes SMS fraudulentos',
        },
    ];

    const safeSuspiciousCase = [
        {
            title: 'Reporta una llamada telefónica, un email o un mensaje de texto/SMS sospechosos',
        },
        {
            title: 'Reportar un sitio web falso o aplicación similar a Temu',
        },
        {
            title: 'Reportar promociones falsas, fraude con tarjeta de regalo, oportunidades de trabajo falsas, etc.',
        },
    ];

    const certificateCards = Object.values(
        import.meta.glob(
            '../../assets/certificate-cards/*.{png,jpg,jpeg,webp,PNG,JPEG}',
            {
                eager: true,
                query: '?url',
                import: 'default',
            },
        ),
    );

    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="safety-center">
                <section className="safety-center-header">
                    <div className="safety-center-header-container max-width">
                        <div>
                            <h1>Centro de seguridad</h1>

                            <p>
                                Temu está comprometido a crear un entorno de
                                compras seguro. Obtén más información sobre
                                nuestros esfuerzos para mejorar la seguridad de
                                Temu para ti.
                            </p>
                        </div>

                        <img src={safetyCenterImg} alt="" />
                    </div>
                </section>

                <section className="safety-center-offset max-width">
                    <div className="safety-center-container">
                        <h2>Protege tu información</h2>

                        <div className="safety-center-items">
                            {safeInformation.map(item => (
                                <div
                                    key={item.title}
                                    className="safety-center-item"
                                >
                                    <div className="safety-center-icon">
                                        <span>{item.icon}</span>
                                        <p>{item.title}</p>
                                    </div>

                                    <FaChevronRight />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="safety-center-container">
                        <h2>Mantente a salvo de los estafadores</h2>

                        <div className="safety-center-items">
                            {safeScammers.map(item => (
                                <div
                                    key={item.title}
                                    className="safety-center-item"
                                >
                                    <div className="safety-center-icon">
                                        <span>{item.icon}</span>
                                        <p>{item.title}</p>
                                    </div>

                                    <FaChevronRight />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="safety-center-container">
                        <h2>Mantente a salvo de los estafadores</h2>

                        <div className="safety-center-items">
                            {safeSuspiciousCase.map(item => (
                                <div
                                    key={item.title}
                                    className="safety-center-item"
                                >
                                    <div className="safety-center-icon">
                                        {item.title}
                                        <FaChevronRight />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2>Socios de seguridad</h2>

                        <p>
                            Temu es una empresa de comercio electrónico para
                            usuarios de todo el mundo, no solo admitimos varios
                            métodos de pago, sino que también hemos obtenido
                            múltiples certificaciones de seguridad para
                            garantizar que tu información se mantenga segura.
                            Obtén más información
                        </p>

                        <div className="safety-center-certificate">
                            {certificateCards.map(galleryItem => (
                                <img
                                    key={galleryItem}
                                    src={galleryItem}
                                    alt=""
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </article>

            <Footer />
        </main>
    );
};

export default SafetyCenter;
