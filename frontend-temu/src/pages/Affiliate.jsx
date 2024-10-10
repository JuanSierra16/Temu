import './Affiliate.css';
import BlackBar from '../components/sections/BlackBar';
import Footer from '../components/sections/Footer';
import NavBar from '../components/sections/navbar/NavBar';
import { GrMoney } from 'react-icons/gr';
import { LuBadgePercent } from 'react-icons/lu';
import { LuHeartHandshake } from 'react-icons/lu';

import affiliateImg from '../assets/affiliate.webp';

const Affiliate = () => {
    return (
        <>
            <BlackBar />
            <NavBar />

            <main className="affiliate">
                <header>
                    <div className="affiliate-title">
                        <h1>
                            Programa de{' '}
                            <span className="orange-text">
                                Afiliados e Influencers
                            </span>
                        </h1>

                        <h2>Gana comisión con Afiliado e Influencer de Temu</h2>

                        <p>
                            Gana comisiones sustanciales con nuestros diversos
                            productos y ofertas exclusivas. ¡Únase ahora para
                            optimizar su tráfico y desbloquear ganancias
                            significativas!
                        </p>
                    </div>

                    <img src={affiliateImg} alt="" />
                </header>

                <article className="max-width">
                    <section className="affiliate-items">
                        <div className="affiliate-item">
                            <div className="affiliate-icon">
                                <GrMoney size={32} />
                                <h3>Comisiones altas</h3>
                            </div>

                            <p>
                                Gana a lo grande promocionando Temu. Un 10~30%
                                de comisión y bonificaciones por descarga
                            </p>
                        </div>

                        <div className="affiliate-item">
                            <div className="affiliate-icon">
                                <LuBadgePercent size={32} />
                                <h3>Precio de venta exclusivo</h3>
                            </div>

                            <p>
                                Una serie de ofertas y descuentos exclusivos de
                                una gran variedad de productos para promocionar.
                            </p>
                        </div>

                        <div className="affiliate-item">
                            <div className="affiliate-icon">
                                <LuHeartHandshake size={32} />
                                <h3>Marca de confianza</h3>
                            </div>

                            <p>
                                Impulsar tu imagen y amplificar tu alcance
                                asociándote con una de las aplicaciones más
                                descargadas
                            </p>
                        </div>
                    </section>
                </article>
            </main>

            <Footer />
        </>
    );
};

export default Affiliate;
