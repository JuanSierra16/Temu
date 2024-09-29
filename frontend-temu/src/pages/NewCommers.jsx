import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';
import ProductGrid from '../components/sections/ProductGrid';
import React, { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../API/Products.API';


const NewCommers = () => {

    const [productsList, setProductsList] = useState([]);
    const [filter, setFilter] = useState('general'); // Estado para manejar el filtro
    const [selected, setSelected] = useState('general'); // Estado para manejar el botón seleccionado


    const handleLoadMore = useCallback(async () => {
        const newProducts = await getProducts(filter); // Aplicar el filtro si es necesario
        setProductsList(prevProducts => [...prevProducts, ...newProducts]);
    }, [filter]); // Añadimos `filter` como dependencia

    useEffect(() => {
        // Cargar productos al cargar el componente
        handleLoadMore();
    }, [handleLoadMore]);

    const handleButtonClick = (filterType) => {
        setSelected(filterType);
        setFilter(filterType); // Cambiar el filtro según el botón seleccionado
    };

    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="max-width">
                <ProductGrid
                    productsList={productsList}
                    handleLoadMore={handleLoadMore}
                />
            </article>

            <Footer />
        </main>
    );
};

export default NewCommers;
