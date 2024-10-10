import BlackBar from '../components/sections/BlackBar';
import Footer from '../components/sections/Footer';
import NavBar from '../components/sections/navbar/NavBar';
import './JoinUs.css';

const JoinUs = () => {
    return (
        <>
            <BlackBar />
            <NavBar />

            <main className="join-us">
                <header>
                    <div className="join-us-title">
                        <h1>Oportunidades profesionales en Temu</h1>
                        <h2>Entre Todos, Bajamos Precios</h2>
                    </div>
                </header>

                <article>
                    <section className="max-width">
                        <h2>No hay ofertas por el momento</h2>
                    </section>
                </article>
            </main>

            <Footer />
        </>
    );
};

export default JoinUs;
