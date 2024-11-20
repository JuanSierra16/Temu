import './SpecialPage.css';

import BlackBar from '../components/sections/BlackBar';
import Footer from '../components/sections/Footer';
import NavBar from '../components/sections/navbar/NavBar';
import ProductGrid from '../components/sections/ProductGrid';
import { useTheme } from '../provider/useTheme';
import { useState } from 'react';
import TitleImg from '../components/sections/themes/TitleImg';

const SpecialPage = () => {
    const { theme } = useTheme();
    const [errorImg, setErrorImg] = useState(false);
    const onErrorImg = () => setErrorImg(true);

    return (
        <>
            <BlackBar />
            <NavBar />

            <main className="special-page">
                <header>
                    <div className="special-back-container">
                        {!errorImg && (
                            <img
                                src={`/themes/${theme.folder}/back.webp`}
                                alt="Temu"
                                className="special-back"
                                onError={onErrorImg}
                            />
                        )}

                        {errorImg && <div className="special-back"></div>}

                        <section className="max-width">
                            <h1>Entre Todos, Bajamos Precios</h1>
                            <h2>
                                Aprovecha todas las ofertas que tenemos para ti
                            </h2>
                        </section>
                    </div>
                </header>

                <TitleImg />
            </main>

            <ProductGrid />
            <Footer />
        </>
    );
};

export default SpecialPage;
