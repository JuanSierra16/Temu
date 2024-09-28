import './About.css';
import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';

import circle from '../assets/about/circle.png';
import empowerment from '../assets/about/empowerment.png';
import inclusion from '../assets/about/inclusion.png';
import Integrity from '../assets/about/integrity.png';
import Responsibility from '../assets/about/responsibility.png';

const About = () => {
    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="max-width about-container">
                <section className="about-subtitle">
                    <div>
                        <h1 className="orange-text">¿Qué es Temu?</h1>

                        <div className="about-header">
                            <img src={circle} alt="" />

                            <div className="about-subtitle-text">
                                <p>
                                    Temu es una empresa de comercio electrónico
                                    que conecta a los consumidores con millones
                                    de socios de mercancías, fabricantes y
                                    marcas con la misión de capacitarlos para
                                    vivir una vida mejor. Temu se compromete a
                                    ofrecer productos asequibles que permitan a
                                    los consumidores y socios comerciales
                                    cumplir sus sueños en un entorno inclusivo.
                                    Temu se fundó en Boston, Massachusetts en
                                    2022.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="about-subtitle-text">
                        <h2 className="orange-text">¿Qué significa Temu?</h2>

                        <p>
                            Temu significa: TEAM UP, PRICE DOWN (Entre Todos,
                            Bajamos Precios)
                        </p>
                        <p>
                            Esperamos que disfrute de los excelentes productos
                            asequibles que ofrecemos en nuestra aplicación de
                            millones de socios, fabricantes y marcas de
                            productos.
                        </p>
                    </div>

                    <div className="about-subtitle-text">
                        <h2 className="orange-text">
                            ¿De dónde provienen los envíos de Temu?
                        </h2>

                        <p>
                            Temu significa: TEAM UP, PRICE DOWN (Entre Todos,
                            Bajamos Precios)
                        </p>
                        <p>
                            Temu envía sus productos de proveedores y
                            fabricantes, con socios de logística experimentados
                            y confiables. Los envíos de Temu pueden variar de
                            origen según el producto que se compre. Sin embargo,
                            Temu trabaja con repartidores de paquetes líderes
                            como UPS, FedEx y USPS para garantizar que todos los
                            pedidos se entreguen de manera rápida y segura a los
                            clientes.
                        </p>
                    </div>
                </section>

                <section>
                    <div className="about-subtitle-text">
                        <h2 className="orange-text">
                            Los puntos fuertes de Temu
                        </h2>

                        <div className="about-list">
                            <p>
                                Temu trae una red sofisticada de socios de
                                mercancías, fabricantes y marcas de todos los
                                tamaños a sus puertas gracias a nuestro:
                            </p>

                            <ul>
                                <li>
                                    Capacidad para{' '}
                                    <strong>
                                        ofrecer una amplia selección de
                                        productos
                                    </strong>
                                </li>
                                <li>
                                    Experiencia en{' '}
                                    <strong>
                                        administrando cadenas de suministro
                                        logísticas complejas
                                    </strong>
                                </li>
                                <li>
                                    <strong>
                                        Modelo de negocio de consumidor a
                                        fabricante (“C2M”)
                                    </strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="orange-text">Nuestros valores</h2>

                    <div className="about-icons">
                        <div className="about-icon">
                            <img src={empowerment} alt="" />

                            <div>
                                <h3 className="orange-text">Empoderamiento</h3>
                                <p>
                                    Todos merecen vivir la vida que sueñan tener
                                </p>
                            </div>
                        </div>

                        <div className="about-icon">
                            <img src={inclusion} alt="" />

                            <div>
                                <h3 className="orange-text">
                                    Inclusión y diversidad
                                </h3>
                                <p>Respetar y aceptar las diferencias</p>
                            </div>
                        </div>

                        <div className="about-icon">
                            <img src={Integrity} alt="" />

                            <div>
                                <h3 className="orange-text">Integridad</h3>
                                <p>Honestidad, ética y confianza</p>
                            </div>
                        </div>

                        <div className="about-icon">
                            <img src={Responsibility} alt="" />

                            <div>
                                <h3 className="orange-text">
                                    Responsabilidad social
                                </h3>
                                <p>Haz bien al mundo</p>
                            </div>
                        </div>
                    </div>
                </section>
            </article>

            <Footer />
        </main>
    );
};

export default About;
