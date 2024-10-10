import './Partner.css';

import BlackBar from '../../components/sections/BlackBar';
import Footer from '../../components/sections/Footer';
import NavBar from '../../components/sections/navbar/NavBar';
import { BsShop } from 'react-icons/bs';
import { TbWorldUp } from 'react-icons/tb';

const Partner = () => {
    return (
        <>
            <BlackBar />
            <NavBar />

            <main className="partner">
                <article className="max-width">
                    <section>
                        <h2>Asóciate a Temu</h2>

                        <p>
                            Temu trabaja con una variedad de socios comerciales
                            y proveedores de servicios para ofrecer productos de
                            calidad más asequibles a los consumidores.
                        </p>

                        <p>
                            El{' '}
                            <a
                                href="https://aimg.kwcdn.com/upload_aimg/about_us/Temu-Third-Party-Code-of-Conduct.pdf"
                                target="_blank"
                            >
                                Código de conducta de Temu
                            </a>{' '}
                            describe los estándares para realizar negocios de
                            manera ética, legal y responsable. También haga clic
                            aquí para ver nuestra lista de productos prohibidos.
                            Esta lista no pretende ser exhaustiva.
                        </p>

                        <div className="partner-list">
                            <div className="partner-item">
                                <BsShop size={48} />

                                <div className="partner-item-content">
                                    <p>Para los socios comerciales:</p>
                                    <p>
                                        Envía un email{' '}
                                        <span className="orange-text">
                                            merchandise@temu.com
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="partner-item">
                                <TbWorldUp size={48} />

                                <div className="partner-item-content">
                                    <p>Para proveedor de logística:</p>
                                    <p>
                                        Envía un email{' '}
                                        <span className="orange-text">
                                            shippingpartner@temu.com
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </main>

            <Footer />
        </>
    );
};

export default Partner;
