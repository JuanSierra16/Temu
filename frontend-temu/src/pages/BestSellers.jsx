import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';
import ProductGrid from '../components/sections/ProductGrid';
import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../API/Products.API';
import './BestSellers.css';
import CartPanel from '../components/sections/CartPanel';

const BestSellers = () => {
    const [productsList, setProductsList] = useState([]);
    const [filter, setFilter] = useState('general'); // Estado para manejar el filtro
    const [selected, setSelected] = useState('general'); // Estado para manejar el botón seleccionado
    const [selectedCategory, setSelectedCategory] = useState('Recomendado');
    const [open, setOpen] = useState(false); // Estado para manejar la apertura y cierre del dropdown

    const handleLoadMore = useCallback(async () => {
        const newProducts = await getProducts(filter); // Aplicar el filtro si es necesario
        setProductsList(prevProducts => [...prevProducts, ...newProducts]);
    }, [filter]); // Añadimos `filter` como dependencia

    useEffect(() => {
        // Cargar productos al cargar el componente
        handleLoadMore();
    }, [handleLoadMore]);

    const handleButtonClick = filterType => {
        setSelected(filterType);
        setFilter(filterType); // Cambiar el filtro según el botón seleccionado
    };

    const toggleDropdown = () => setOpen(!open);

    const handleCategorySelect = category => {
        setSelectedCategory(category);
        setOpen(false);
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
                        className={`button ${selected === 'ultimos-30' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('ultimos-30')}
                    >
                        En los últimos 30 días
                    </button>
                    <button
                        className={`button ${selected === 'ultimos-7' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('ultimos-7')}
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
                <ProductGrid
                    productsList={productsList}
                    handleLoadMore={handleLoadMore}
                />
            </article>

            <CartPanel />
            <Footer />
        </main>
    );
};

export default BestSellers;
