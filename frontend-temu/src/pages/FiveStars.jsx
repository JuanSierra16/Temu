import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';
import ProductGrid from '../components/sections/ProductGrid';
import { useContext, useEffect, useState } from 'react';
import CartPanel from '../components/sections/CartPanel';
import { ProductsContext } from '../provider/ProductsContext';

const FiveStars = () => {
    const [filter, setFilter] = useState('general'); // Estado para manejar el filtro
    const [selected, setSelected] = useState('general'); // Estado para manejar el botón seleccionado
    const { fiveStarProducts } = useContext(ProductsContext);

    const handleButtonClick = filterType => {
        setSelected(filterType);
        setFilter(filterType); // Cambiar el filtro según el botón seleccionado

        if (filterType === 'Recomendado') {
            fiveStarProducts(null);
        } else {
            fiveStarProducts(filterType);
        }
    };

    useEffect(() => {
        // Cargar productos al cargar el componente
        fiveStarProducts(null);
    }, [fiveStarProducts]);

    return (
        <main>
            <BlackBar />
            <NavBar />

            <div className="header-container">
                <header className="max-width button-group">
                    <button
                        className={`button ${selected === 'Recomendado' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('Recomendado')}
                    >
                        Recomendado
                    </button>
                    <button
                        className={`button ${selected === 'joyeria-accesorios' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('joyeria-accesorios')}
                    >
                        Joyeria y accesorios
                    </button>
                    <button
                        className={`button ${selected === 'deporte-aire' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('deporte-aire')}
                    >
                        Deporte y aire libre
                    </button>

                    <button
                        className={`button ${selected === 'Ropa-mujer' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('Ropa-mujer')}
                    >
                        Ropa de mujer
                    </button>

                    <button
                        className={`button ${selected === 'hogar-cocina' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('hogar-cocina')}
                    >
                        Hogar y cocina
                    </button>

                    <button
                        className={`button ${selected === 'moda-infantil' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('moda-infantil')}
                    >
                        Moda infantil
                    </button>

                    <button
                        className={`button ${selected === 'ropa-hombre' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('ropa-hombre')}
                    >
                        Ropa de hombre
                    </button>

                    <button
                        className={`button ${selected === 'ropa-playa' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('ropa-playa')}
                    >
                        Ropa de playa
                    </button>

                    <button
                        className={`button ${selected === 'lenceria-pijama' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('lenceria-pijamas')}
                    >
                        Lencerias y pijamas de mujer
                    </button>
                </header>
            </div>

            <article className="max-width">
                <ProductGrid />
            </article>

            <CartPanel />
            <Footer />
        </main>
    );
};

export default FiveStars;
