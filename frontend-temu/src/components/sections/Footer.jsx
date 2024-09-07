import './Footer.css';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaTiktok } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="Footer">
            <div className="sb__footer__section__padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links_div">
                        <h4> Informcion de la empresa </h4>
                        <a href="/A cerca de temu">
                            <p>A cerca de</p>
                        </a>
                        <a href="/Afiliado e influecer gana comisiones">
                            <p>Afiliado e influecer gana comisiones</p>
                        </a>
                        <a href="/Contactanos">
                            <p>Contactanos</p>
                        </a>
                        <a href="/Carreras profesionales">
                            <p>Carreras profesionales</p>
                        </a>
                        <a href="/Prensa">
                            <p>Prensa</p>
                        </a>
                        <a href="/Programa de plantación de arboles">
                            <p>Programa de plantación de arboles</p>
                        </a>
                        <a href="/Temu">
                            <p>Temu</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Atención al cliente</h4>
                        <a href="/Politica de devolución y reembolso">
                            <p>Politica de devolución y reembolso</p>
                        </a>
                        <a href="/Politica de propiedad intelectual">
                            <p>Politica de propiedad intelectual</p>
                        </a>
                        <a href="/Politica de envios">
                            <p>Politica de envios</p>
                        </a>
                        <a href="/Reportar actividad sospechosa">
                            <p>Reportar actividad sospechosa</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Ayuda</h4>
                        <a href="/Centro de ayuda y preguntas frecuentes">
                            <p>Centro de ayuda y preguntas frecuentes</p>
                        </a>
                        <a href="/Centro de seguridad">
                            <p>Centro de seguridad</p>
                        </a>
                        <a href="/Protección de compras de Temu">
                            <p>Protección de compras de Temu</p>
                        </a>
                        <a href="/Asociate a Temu">
                            <p>Asociate a Temu</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Descarga la app de Temu</h4>
                        <a href="/Rastrea pedidos en todo momento">
                            <p>Rastrea pedidos en todo momento</p>
                        </a>
                        <a href="/Alertas de articulos con poco stock">
                            <p>Alertas de articulos con poco stock</p>
                        </a>
                        <a href="/Alerta de cupones y ofertas">
                            <p>Alerta de cupones y ofertas</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Conectar con Temu</h4>
                        <div className="SocialMedia">
                            <p>
                                <FaInstagram />
                            </p>
                            <p>
                                <FaFacebook />
                            </p>
                            <p>
                                <FaXTwitter />
                            </p>
                            <p>
                                <FaTiktok />
                            </p>
                            <p>
                                <FaYoutube />
                            </p>
                            <p>
                                <FaPinterest />
                            </p>
                        </div>
                    </div>
                </div>

                <hr></hr>

                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p>© 2024 WhaleCo Inc.</p>
                    </div>
                    <div className="sb__footer-below-links">
                        <a href="/Terminos de uso">
                            <div>
                                <p>Terminos de uso</p>
                            </div>
                        </a>
                        <a href="/Politica de privacidad">
                            <div>
                                <p>Politica de privacidad</p>
                            </div>
                        </a>
                        <a href="/Tus preferencia de seguridad">
                            <div>
                                <p>Tus preferencia de seguridad</p>
                            </div>
                        </a>
                        <a href="/Gestión de anuncios">
                            <div>
                                <p>Gestión de anuncios</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
