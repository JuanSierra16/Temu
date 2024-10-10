import BlackBar from '../components/sections/BlackBar';
import Footer from '../components/sections/Footer';
import NavBar from '../components/sections/navbar/NavBar';
import './Press.css';

const Press = () => {
    const iamges = Object.values(
        import.meta.glob('../assets/press/*.{png,jpg,jpeg,webp,PNG,JPEG}', {
            eager: true,
            query: '?url',
            import: 'default',
        }),
    );

    return (
        <>
            <BlackBar />
            <NavBar />

            <main className="press">
                <header>
                    <h1>Rincón de la prensa</h1>

                    <div className="press-content">
                        <div className="press-content-item">
                            <p>
                                Nos encanta trabajar con usted y compartir
                                historias sobre nuestra comunidad de clientes,
                                socios del ecosistema y socios de mercancías.
                                Por favor póngase en contacto con nosotros en{' '}
                                <span className="press-underline">
                                    media@temu.com.
                                </span>
                            </p>

                            <p>
                                Comunícate con nosotros por email:{' '}
                                <span className="press-underline">
                                    media@temu.com
                                </span>
                            </p>
                        </div>

                        <div className="press-content-item">
                            <p>
                                Solo los miembros de la prensa recibirán una
                                respuesta. Si eres comprador y tienes preguntas
                                sobre Temu, visita{' '}
                                <a
                                    href="https://www.temu.com/support-center.html"
                                    target="_blank"
                                    className="press-underline"
                                >
                                    temu.com/support-center.html.
                                </a>
                            </p>

                            <p>
                                Para consultas que no son de los medios de
                                comunicación: Atención al cliente de Temu
                            </p>
                        </div>
                    </div>
                </header>

                <article>
                    <section className="max-width press-files">
                        <h2>Activos de la marca</h2>

                        <div className="press-images">
                            {iamges.map(image => (
                                <img key={image} src={image} alt={image} />
                            ))}
                        </div>
                    </section>
                </article>
            </main>

            <Footer />
        </>
    );
};

export default Press;
