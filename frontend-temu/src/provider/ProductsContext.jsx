import { createContext, useEffect, useState } from 'react';
import { getProducts } from '../API/Products.API';

const ProductsContext = createContext(null);

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [offerProducts, setOfferProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();

            // load 10 random products
            const randomProducts = data
                .sort(() => Math.random() - 0.5)
                .slice(0, 10);

            setAllProducts(data);
            setProducts(randomProducts);
            setOfferProducts(
                data.filter(
                    product => parseFloat(product.precio_con_descuento) < 50,
                ),
            );
        };

        if (products.length === 0) {
            fetchProducts();
        }
    }, []);

    const loadMoreProducts = async () => {
        // load 5 random products from all products, check if not repeated
        const randomProducts = allProducts
            .sort(() => Math.random() - 0.5)
            .slice(0, products.length)
            .filter(product => !products.includes(product));

        setProducts(prevProducts => [...prevProducts, ...randomProducts]);
    };

    const loadProducts = async () => {
        const randomProducts = allProducts
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);

        setProducts(randomProducts);
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                offerProducts,
                loadProducts,
                loadMoreProducts,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsContext, ProductsProvider };
