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
import { certificateCards } from '../../utils/Cards';

const SafetyCenter = () => {
    const safeInformation = [
        {
            icon: <FaLock size={32} />,
            title: 'Protege tus datos',
            content:
                'En nuestra plataforma, tu seguridad es prioridad. Utilizamos tecnología avanzada de encriptación para garantizar que tu información personal y financiera esté siempre protegida. Además, contamos con sistemas de seguridad robustos para prevenir accesos no autorizados. Compra con confianza, sabiendo que tus datos están seguros con nosotros.',
        },
        {
            icon: <FaUserCircle size={32} />,
            title: 'Protege tu cuenta',
            content:
                'Mantén tu información segura siguiendo estos consejos. Nunca compartas tu contraseña ni tus datos personales con terceros. Utiliza contraseñas fuertes y únicas para tu cuenta, combinando letras, números y símbolos. Evita acceder a tu cuenta desde dispositivos o redes públicas. Habilita la autenticación en dos pasos para añadir una capa extra de seguridad. Recuerda, tu privacidad está en tus manos.',
        },
        {
            icon: <BsCartCheckFill size={32} />,
            title: 'Protege tu pago',
            content:
                'Asegura tus transacciones utilizando métodos de pago confiables y verificados. Evita compartir detalles de tu tarjeta o información bancaria por mensajes o correos electrónicos. Verifica siempre que la página donde realizas el pago esté cifrada (busca el ícono del candado en la barra de dirección). Además, revisa regularmente los movimientos de tu cuenta para detectar cualquier actividad sospechosa. Con estos simples pasos, puedes comprar con tranquilidad.',
        },
    ];

    const safeScammers = [
        {
            icon: <TiWarning size={32} />,
            title: 'Reconoce estafas',
            content:
                'Desconfía de vendedores que te piden realizar pagos fuera de la plataforma. Cuidado con correos o mensajes que te pidan información personal o financiera urgente. Siempre verifica la autenticidad del sitio web. Si algo te parece sospechoso, es mejor detener la transacción y contactar al soporte de la plataforma.',
        },
        {
            icon: <BiSolidMessageAltError size={32} />,
            title: 'Reconoce fraudulentos',
            content:
                'Mantente alerta ante perfiles sospechosos. Los estafadores suelen tener poca información en su perfil, ausencia de calificaciones o comentarios negativos. Si un vendedor te presiona para hacer una compra rápida o te pide pagos fuera de los canales seguros de la plataforma, es una señal de advertencia. Verifica siempre la reputación del vendedor y evita compartir información personal con desconocidos. Ante cualquier duda, consulta con el servicio de soporte.',
        },
        {
            icon: <BiSolidMessageRoundedError size={32} />,
            title: 'Reconoce mensajes SMS fraudulentos',
            content: `Ten cuidado con los SMS que te pidan datos personales o financieros. Los mensajes fraudulentos suelen incluir enlaces sospechosos o urgencias como "tu cuenta ha sido bloqueada" o "ganaste un premio". Desconfía si te piden hacer clic en un enlace o descargar archivos. Verifica siempre el remitente y, en caso de duda, contacta directamente a la empresa a través de sus canales oficiales. Nunca compartas contraseñas ni datos sensibles a través de SMS.`,
        },
    ];

    const safeSuspiciousCase = [
        {
            title: 'Reporta una llamada telefónica, un email o un mensaje de texto/SMS sospechosos',
            content:
                'Puedes reportar la situación directamente en nuestra plataforma a través de la sección de Seguridad o contactando a nuestro equipo de soporte. También te recomendamos informar a las autoridades locales o agencias de protección al consumidor. Proporciona todos los detalles que puedas, como el número de teléfono, dirección de correo o capturas de pantalla del mensaje, para ayudarnos a investigar el caso.',
        },
        {
            title: 'Reportar un sitio web falso o aplicación similar a Temu',
            content:
                'Si encuentras un sitio web o aplicación que parece imitar a Temu de manera fraudulenta, no ingreses tus datos personales ni realices compras. Puedes reportarlo directamente a través de nuestra plataforma en la sección de Seguridad y Fraudes o contactando a nuestro equipo de soporte. Proporciona la URL del sitio falso o el enlace a la aplicación para que podamos tomar las medidas adecuadas.',
        },
        {
            title: 'Reportar promociones falsas, fraude con tarjeta de regalo, oportunidades de trabajo falsas, etc.',
            content:
                'Si te encuentras con una promoción que parece demasiado buena para ser cierta, una oferta de empleo sospechosa o un fraude relacionado con tarjetas de regalo, evita interactuar o proporcionar cualquier tipo de información personal. Puedes reportar estos casos directamente en nuestra plataforma en la sección Reportar Fraude o contactando a nuestro equipo de Atención al Cliente. También te sugerimos informar a las autoridades locales y agencias de protección al consumidor. Asegúrate de incluir cualquier detalle relevante, como correos electrónicos, números de contacto o enlaces fraudulentos, para ayudarnos a tomar las acciones necesarias.',
        },
    ];

    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="safety-center">
                <section className="safety-center-header">
                    <header className="safety-center-header-container max-width">
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
                    </header>
                </section>

                <section className="safety-center-offset max-width">
                    <div className="safety-center-container">
                        <h2>Protege tu información</h2>

                        <div className="safety-center-items">
                            {safeInformation.map(item => (
                                <details
                                    key={item.title}
                                    className="safety-center-item"
                                >
                                    <summary className="safety-center-summary">
                                        <div className="safety-center-icon">
                                            <span>{item.icon}</span>
                                            <p>{item.title}</p>
                                        </div>

                                        <FaChevronRight />
                                    </summary>

                                    <p className="safety-center-item-content">
                                        {item.content}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>

                    <div className="safety-center-container">
                        <h2>Mantente a salvo de los estafadores</h2>

                        <div className="safety-center-items">
                            {safeScammers.map(item => (
                                <details
                                    key={item.title}
                                    className="safety-center-item"
                                >
                                    <summary className="safety-center-summary">
                                        <div className="safety-center-icon">
                                            <span>{item.icon}</span>
                                            <p>{item.title}</p>
                                        </div>

                                        <FaChevronRight />
                                    </summary>

                                    <p className="safety-center-item-content">
                                        {item.content}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>

                    <div className="safety-center-container">
                        <h2>Mantente a salvo de los estafadores</h2>

                        <div className="safety-center-items">
                            {safeSuspiciousCase.map(item => (
                                <details
                                    key={item.title}
                                    className="safety-center-item"
                                >
                                    <summary className="safety-center-summary">
                                        {item.title}
                                        <FaChevronRight />
                                    </summary>

                                    <p className="safety-center-item-content">
                                        {item.content}
                                    </p>
                                </details>
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
