import './SupportQuestions.css';
import BlackBar from '../../components/sections/BlackBar';
import NavBar from '../../components/sections/navbar/NavBar';
import Footer from '../../components/sections/Footer';
import { FaAngleRight } from 'react-icons/fa';

const SupportQuestions = () => {
    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="support-questions">
                <header>
                    <div className="max-width">
                        <h1>Hola, ¿cómo podemos ayudarte?</h1>

                        <p>
                            Selecciona un pedido para obtener ayuda con
                            problemas de artículos, envíos, devoluciones,
                            reembolsos, etc.
                        </p>
                    </div>
                </header>

                <section className="max-width support-container">
                    <h2>Temas recomendados</h2>

                    <div className="support-items">
                        {/* falta crear cada ruta*/}
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="support-item">
                                <p>Cargos desconocidos</p>
                                <FaAngleRight size={24} />
                            </div>
                        ))}
                    </div>
                </section>
            </article>

            <Footer />
        </main>
    );
};

export default SupportQuestions;
