import { useContext, useEffect } from 'react';
import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import ProductGrid from '../components/sections/ProductGrid';
import Footer from '../components/sections/Footer';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../provider/ProductsContext';

const SearchProduct = () => {
    const { categoryOrName } = useParams();
    const { findByCategoryOrName } = useContext(ProductsContext);

    useEffect(() => {
        const URIDecode = decodeURIComponent(categoryOrName);
        findByCategoryOrName(URIDecode);
    }, [categoryOrName, findByCategoryOrName]);

    return (
        <>
            <BlackBar />
            <NavBar />
            <ProductGrid />
            <Footer />
        </>
    );
};

export default SearchProduct;
