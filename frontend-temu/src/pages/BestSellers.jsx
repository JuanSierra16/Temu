import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';
import ProductGrid from '../components/sections/ProductGrid';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getProducts } from '../API/Products.API';
import './BestSellers.css';
import CartPanel from '../components/sections/CartPanel';
import { ProductsContext } from '../provider/ProductsContext';

const BestSellers = () => {
    const [filter, setFilter] = useState('general'); // Estado para manejar el filtro
    const [selected, setSelected] = useState('general'); // Estado para manejar el botón seleccionado
    const [selectedCategory, setSelectedCategory] = useState('Recomendado');
    const [open, setOpen] = useState(false); // Estado para manejar la apertura y cierre del dropdown

    useEffect(() => {}, []);
    const { bestProductsSellers } = useContext(ProductsContext);

    const handleButtonClick = filterType => {
        setSelected(filterType);
        setFilter(filterType); // Cambiar el filtro según el botón seleccionado
    };

    const toggleDropdown = () => setOpen(!open);

    const handleCategorySelect = category => {
        setSelectedCategory(category);
        setOpen(false);

        if (category === 'Recomendado') {
            setFilter('general');
            bestProductsSellers(null);
        } else {
            setFilter(category);
            bestProductsSellers(category);
        }
    };

    return (
        <main>
            <BlackBar />
            <NavBar />

            <div className="header-container max-width">
                <h3>Más vendidos</h3>

                {/* Aquí están los botones */}
                <header className="button-group">
                    <button
                        className={`button ${selected === 'general' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('general')}
                    >
                        En general
                    </button>
                    <button
                        className={`button ${selected === 'últimos-30' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('últimos-30')}
                    >
                        En los últimos 30 días
                    </button>
                    <button
                        className={`button ${selected === 'últimos-7' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('últimos-7')}
                    >
                        En los últimos 7 días
                    </button>

                    <div className="dropdown">
                        <button
                            className="dropdown-button"
                            onClick={toggleDropdown}
                        >
                            Filtrar por categoría: {selectedCategory}
                            <span>{open ? '▲' : '▼'}</span>
                        </button>
                        {open && (
                            <ul className="dropdown-menu">
                                {[
                                    'Recomendado',
                                    'Belleza y salud',
                                    'Ropa de mujer',
                                    'Hogar y cocina',
                                    'Ropa de hombre',
                                    'Calzado de mujer',
                                    'Ropa interior y pijamas de hombre',
                                    'Deporte y aire libre',
                                    'Oficina y escuela',
                                    'Juguetes',
                                    'Moda infantil',
                                    'Tecnología',
                                ].map(category => (
                                    <li
                                        key={category}
                                        className={
                                            category === selectedCategory
                                                ? 'active'
                                                : ''
                                        }
                                        onClick={() =>
                                            handleCategorySelect(category)
                                        }
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </header>
                {/* Fin de los botones */}
            </div>

            <article className="max-width">
                <ProductGrid />
            </article>

            <CartPanel />
            <Footer />
        </main>
    );
};

export default BestSellers;
