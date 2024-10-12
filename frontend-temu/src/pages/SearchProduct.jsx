import { useContext, useEffect } from 'react';
import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import ProductGrid from '../components/sections/ProductGrid';
import Footer from '../components/sections/Footer';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../provider/ProductsContext';

const SearchProduct = () => {
    const { nameCategory } = useParams();
    const { findByCategoryOrName } = useContext(ProductsContext);

    useEffect(() => {
        const URIDecode = decodeURIComponent(nameCategory);
        findByCategoryOrName(URIDecode);
    }, [nameCategory, findByCategoryOrName]);

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
