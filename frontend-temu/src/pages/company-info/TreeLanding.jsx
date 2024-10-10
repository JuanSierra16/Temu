import './TreeLanding.css';
import BlackBar from '../../components/sections/BlackBar';
import Footer from '../../components/sections/Footer';
import Navbar from '../../components/sections/navbar/NavBar';
import { GiFruitTree } from 'react-icons/gi';

import certificate from '../../assets/certificate-temu.webp';

const TreeLanding = () => {
    const images = Object.values(
        import.meta.glob(
            '../../assets/tree-landing/*.{png,jpg,jpeg,webp,PNG,JPEG}',
            {
                eager: true,
                query: '?url',
                import: 'default',
            },
        ),
    );

    return (
        <>
            <BlackBar />
            <Navbar />

            <main className="tree-landing">
                <article className="max-width">
                    <section>
                        <h2>Programa de plantación de árboles Temu</h2>

                        <p>
                            Temu se ha asociado con{' '}
                            <a href="https://trees.org/" target="_blank">
                                Trees for the Future
                            </a>{' '}
                            para plantar árboles en toda el África subsahariana
                            en beneficio a los pequeños agricultores de esta
                            región. Estos árboles plantados por Temu y sus
                            usuarios han tenido un efecto transformador en la
                            tierra y en las comunidades locales. Aquí tienes un
                            resumen de nuestro impacto hasta ahora:
                        </p>

                        <div className="tree-landing-icon">
                            <GiFruitTree size={48} />
                            <h3>14.737.560</h3>
                            <p>árboles financiados desde julio de 2023*</p>
                        </div>

                        <p>
                            *El número de árboles financiados proviene de
                            donaciones voluntarias de clientes que hicieron clic
                            en la casilla &quot;Plantar con Temu&quot; al
                            finalizar la compra y de Temu.
                        </p>
                    </section>

                    <section className="tree-landing-flex">
                        <img
                            src={certificate}
                            alt=""
                            className="tree-landing-certificate"
                        />

                        <div>
                            <h3>Certificado de apoyo</h3>
                            <p>
                                Puedes encontrar más información a través del
                                siguiente enlace.
                            </p>

                            <a
                                href="https://trees.org/sponsor/whaleco_technology_dba_temu/"
                                target="_blank"
                            >
                                Nuestra página de patrocinadores en Trees for
                                the Future
                            </a>
                        </div>
                    </section>

                    <section className="tree-landing-flex">
                        <div>
                            <h3>¿Cómo puedo donar?</h3>

                            <p>
                                Cuando estés listo para realizar un pedido,
                                marca la casilla &quot;Plantar con Temu&quot; al
                                finalizar la compra
                            </p>
                        </div>

                        <div>
                            <h3>Confirmación del pedido</h3>
                            <p>Plantar con Temu</p>
                            <p>Te invitamos a plantar un árbol por $1.474</p>
                        </div>
                    </section>

                    <section>
                        <h3>Plantando con Trees for the Future</h3>

                        <p>
                            Las imágenes fueron proporcionadas por{' '}
                            <a href="https://trees.org/" target="_blank">
                                Trees for the Future.
                            </a>
                        </p>

                        <div className="tree-landing-images">
                            {images.map((image, index) => (
                                <img key={index} src={image} alt="" />
                            ))}
                        </div>
                    </section>
                </article>
            </main>

            <Footer />
        </>
    );
};

export default TreeLanding;
