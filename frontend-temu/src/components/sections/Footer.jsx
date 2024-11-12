import { FaApple } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaTiktok } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaPinterest } from 'react-icons/fa';
import { FaTruckFast } from 'react-icons/fa6';
import { GiSandsOfTime } from 'react-icons/gi';
import { MdDiscount } from 'react-icons/md';

import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { ProductsContext } from '../../provider/ProductsContext';
import { certificateCards, paymentCards } from '../../utils/Cards';

const Footer = () => {
    const footer = useRef(null);

    const { products } = useContext(ProductsContext);

    useEffect(() => {
        const check = () => {
            if (footer.current) {
                const footerPosition = footer.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (footerPosition.bottom < windowHeight) {
                    footer.current.style.position = 'fixed';
                    footer.current.style.bottom = '0';
                } else {
                    footer.current.style.position = 'unset';
                    footer.current.style.bottom = 'unset';
                }
            }
        };

        return (window.onload = () => {
            check();
        });
    }, [products]);

    const companyInfo = [
        { name: 'Acerca de Temu', path: '/about' },
        { name: 'Temu - ¡Entre todos, Bajamos Precios', path: null },
        { name: 'Afililado e influencer: gana comisiones', path: '/affiliate' },
        { name: 'Contáctanos', path: '/contact-us' },
        { name: 'Carreras profesionales', path: '/join-us' },
        { name: 'Prensa', path: '/press' },
        {
            name: 'Programa de plantación de árboles Temu',
            path: '/tree-landing',
        },
    ];

    const client = [
        { name: 'Política de devolución y reembolso', path: '/return-policy' },
        { name: 'Política de propiedad intelectual', path: '/property-policy' },
        { name: 'Política de envíos', path: '/shipping-information' },
        { name: 'Reportar actividad sospechosa', path: '/report-case' },
    ];

    const help = [
        {
            name: 'Centro de ayuda y preguntas frecuentes',
            path: '/support-questions',
        },
        { name: 'Centro de seguridad', path: '/safety-center' },
        { name: 'Protección de compras de Temu', path: '/purchase-safe' },
        { name: 'Asóciate a Temu', path: '/partner-with-temu' },
    ];

    const belowFooter = [
        { name: 'Términos de uso.', path: '/terms-of-use' },
        { name: 'Política de privacidad.', path: '/privacy-policy' },
        {
            name: 'Tus preferencias de privacidad.',
            path: '/privacy-preferences',
        },
        { name: 'Gestión de anuncios.', path: '/cookies-policy' },
    ];

    return (
        <footer className="footer" ref={footer}>
            <div className="footer-container max-width">
                <div className="footer-links">
                    <div className="footer-links-container">
                        <h5>Información de la empresa</h5>

                        {companyInfo.map(company => (
                            <span key={company.name}>
                                {company.path && (
                                    <Link key={company.name} to={company.path}>
                                        <p>{company.name}</p>
                                    </Link>
                                )}
                                {!company.path && (
                                    <p key={company.name}>{company.name}</p>
                                )}
                            </span>
                        ))}
                    </div>

                    <div className="footer-links-container">
                        <h5>Atención al cliente</h5>

                        {client.map(company => (
                            <Link
                                key={company.name}
                                to={company.path}
                                target="_blank"
                            >
                                <p>{company.name}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="footer-links-container">
                        <h5>Ayuda</h5>

                        {help.map(company => (
                            <Link
                                key={company.name}
                                to={company.path}
                                target="_blank"
                            >
                                <p>{company.name}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="footer-links-container">
                        <h5>Descarga la app de Temu</h5>

                        <div className="footer-icon-text">
                            <FaTruckFast size={24} />
                            <p>Rastrea pedidos en todo momento</p>
                        </div>

                        <div className="footer-icon-text">
                            <GiSandsOfTime size={24} />
                            <p>Alertas de articulos con poco stock</p>
                        </div>

                        <div className="footer-icon-text">
                            <MdDiscount size={24} />
                            <p>Alerta de cupones y ofertas</p>
                        </div>

                        <button className="footer-app-button">
                            <a
                                href="https://apps.apple.com/co/app/temu-compra-como-millonario/id1641486558"
                                target="_blank"
                            >
                                <FaApple size={24} />

                                <span>
                                    <p>
                                        <small>Descargar en</small>
                                    </p>
                                    <p>
                                        <strong>App Store</strong>
                                    </p>
                                </span>
                            </a>
                        </button>

                        <button className="footer-app-button">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.einnovation.temu&hl=es&gl=co&referrer=adg_reftag%3Dafb7bf7be9b68b87e7d299f64eac28c8%26ads_channel%3Dgoogle%26ads_sub_channel%3Dsearch%26ads_account%3D1204871858%26ads_set%3D21104778154%26ads_id%3D161509618962%26ads_creative_id%3D693748223408%26ns_source%3Dg%26ns_keyword%3Dtemu%26ns_match_type%3De%26gclid%3DEAIaIQobChMI6cqLo-iuiAMVLaxaBR0HEgfMEAAYASAAEgIcOPD_BwE%26wbraid%3DCj8KCQjwreW2BhCRARIuAEiZJEBLvg2vD8bWGmalxjcoiziu-jAEapZJ_jzf63owbalug-SJtXILT8cKWRoCzKo%26gbraid%3D0AAAAAo4mICGep8aI9r4nY51cNbOusoTVK%26vst_type%3Dadg"
                                target="_blank"
                            >
                                <img
                                    src="/google-play-icon.png"
                                    alt=""
                                    style={{ width: 24, height: 24 }}
                                />

                                <span>
                                    <p>
                                        <small>Descargar en</small>
                                    </p>
                                    <p>
                                        <strong>Google Play</strong>
                                    </p>
                                </span>
                            </a>
                        </button>
                    </div>

                    <div className="footer-links-container">
                        <h5>Conectar con Temu</h5>

                        <div className="footer-links-social">
                            <a
                                href="https://www.instagram.com/temu/"
                                target="_blank"
                            >
                                <FaInstagram size={24} />
                            </a>

                            <a
                                href="https://www.facebook.com/shoptemu/"
                                target="_blank"
                            >
                                <FaFacebook size={24} />
                            </a>

                            <a href="https://x.com/shoptemu" target="_blank">
                                <FaXTwitter size={24} />
                            </a>
                        </div>

                        <div className="footer-links-social">
                            <a href="https://x.com/shoptemu" target="_blank">
                                <FaTiktok size={24} />
                            </a>

                            <a
                                href="https://www.youtube.com/@temu"
                                target="_blank"
                            >
                                <FaYoutube size={24} />
                            </a>

                            <a
                                href="https://co.pinterest.com/shoptemu/"
                                target="_blank"
                            >
                                <FaPinterest size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-cards">
                    <div>
                        <h6>Certificación de seguridad</h6>

                        <div className="footer-certificate">
                            {certificateCards.map(galleryItem => (
                                <img
                                    key={galleryItem}
                                    src={galleryItem}
                                    alt=""
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h6>Aceptamos</h6>

                        <div className="footer-certificate">
                            {paymentCards.map(galleryItem => (
                                <img
                                    key={galleryItem}
                                    src={galleryItem}
                                    alt=""
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <hr />

                <div className="footer-below">
                    <p>© 2024 WhaleCo Inc.</p>

                    {belowFooter.map(belowFooterLink => (
                        <Link
                            key={belowFooterLink.name}
                            to={belowFooterLink.path}
                            target="_blank"
                        >
                            {belowFooterLink.name}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
