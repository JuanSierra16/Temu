import ScrollToTopButton from '../../components/elements/ScrollToTopButton';
import Footer from '../../components/sections/Footer';
import WhiteBar from '../../components/sections/navbar/WhiteBar';
import { Link } from 'react-router-dom';

const PrivacyPreferences = () => {
    return (
        <>
            <WhiteBar />
            <ScrollToTopButton />

            <article className="max-width privacy-container">
                <h1 className="privacy-tittle">
                    Tus preferencias de privacidad
                </h1>

                <h2>Cookies y tecnologías necesarias</h2>

                <p>
                    Para conocer detalles sobre cómo utilizamos tus datos,
                    consulta nuestra{' '}
                    <Link
                        to="/privacy-policy"
                        target="_blank"
                        className="orange-text"
                    >
                        Política de privacidad
                    </Link>{' '}
                    y nuestra{' '}
                    <Link
                        to="/cookies-policy"
                        target="_blank"
                        className="orange-text"
                    >
                        Política de cookies y tecnologías similares
                    </Link>
                    .
                </p>

                <h2>Opciones adicionales de privacidad</h2>

                <p>
                    Eliminación u otras solicitudes específicas relacionadas con
                    tu información personal desde el dashboard del usuario.
                </p>
            </article>

            <Footer />
        </>
    );
};

export default PrivacyPreferences;
