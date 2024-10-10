import BlackBar from '../components/sections/BlackBar';
import Footer from '../components/sections/Footer';
import NavBar from '../components/sections/navbar/NavBar';
import './ContactUs.css';

const ContactUs = () => {
    const socialMedia = [
        {
            name: 'Temu Oficial',
            tag: '@temu',
            link: 'https://www.instagram.com/temu/',
            img: '/icons/instagram.webp',
        },
        {
            name: 'Temu',
            tag: '@shoptemu',
            link: 'https://www.facebook.com/shoptemu',
            img: '/icons/facebook.webp',
        },
        {
            name: 'Temu',
            tag: '@shoptemu',
            link: 'https://x.com/shoptemu',
            img: '/icons/twitter.webp',
        },
        {
            name: 'temu',
            tag: '@temu',
            link: 'https://www.tiktok.com/@temu',
            img: '/icons/tiktok.webp',
        },
        {
            name: 'shoptemu',
            tag: '',
            link: 'https://www.youtube.com/@temu',
            img: '/icons/youtube.webp',
        },
        {
            name: 'Temu',
            tag: '@shoptemu',
            link: 'https://co.pinterest.com/temuonline/',
            img: '/icons/pinterest.webp',
        },
    ];

    return (
        <>
            <BlackBar />
            <NavBar />

            <main className="contact-us">
                <header>
                    <div className="contact-us-title">
                        <h1>Contáctanos</h1>
                        <h2>Respuestas rápidas y en tiempo real</h2>
                    </div>
                </header>

                <article className="max-width">
                    <section className="contact-us-info">
                        <div className="contact-us-info-item">
                            <h3>¿Necesitas ayuda?</h3>

                            <p>
                                Contacta al servicio de atención al cliente de
                                Temu para obtener ayuda.
                            </p>

                            <p className="orange-text">Contáctanos</p>
                        </div>

                        <div className="contact-us-info-item">
                            <h3>Dirección de la oficina</h3>

                            <p>
                                First Floor, 25 St Stephens Green, Dublin 2,
                                Ireland
                            </p>

                            <p className="orange-text">
                                Ten en cuenta que las devoluciones no se
                                aceptarán en esta dirección
                            </p>
                        </div>
                    </section>

                    <section className="contact-us-social">
                        <h2>También estamos en redes sociales</h2>

                        <div className="contact-us-social-items">
                            {socialMedia.map(item => (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    key={item.name}
                                >
                                    <img src={item.img} alt="" />

                                    <div>
                                        <p>{item.name}</p>
                                        <p>{item.tag}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </article>
            </main>

            <Footer />
        </>
    );
};

export default ContactUs;
