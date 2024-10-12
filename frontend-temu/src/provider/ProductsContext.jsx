import { createContext, useCallback, useEffect, useState } from 'react';
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

            // console.log(data);
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

    const filterProducts = useCallback(
        category => {
            if (category) {
                const filteredProducts = allProducts.filter(
                    product =>
                        product?.categoria_padre_nombre.toLowerCase() ===
                            category.toLowerCase() ||
                        product?.categoria_nombre.toLowerCase() ===
                            category.toLowerCase(),
                );

                setProducts(filteredProducts);
            } else {
                loadProducts();
            }
        },
        [allProducts],
    );

    const bestProductsSellers = useCallback(
        category => {
            let filteredProducts = allProducts.filter(
                product => Number(product.ranking) >= 4.5,
            );

            if (category) {
                filteredProducts = filteredProducts.filter(
                    product =>
                        product?.categoria_padre_nombre.toLowerCase() ===
                            category.toLowerCase() ||
                        product?.categoria_nombre.toLowerCase() ===
                            category.toLowerCase(),
                );
            }

            setProducts(filteredProducts);
        },
        [allProducts],
    );

    const fiveStarProducts = useCallback(
        category => {
            let filteredProducts = allProducts.filter(
                product => Number(product.estrellas) >= 4.8,
            );

            if (category) {
                filteredProducts = filteredProducts.filter(
                    product =>
                        product?.categoria_padre_nombre.toLowerCase() ===
                            category.toLowerCase() ||
                        product?.categoria_nombre.toLowerCase() ===
                            category.toLowerCase(),
                );
            }

            setProducts(filteredProducts);
        },
        [allProducts],
    );

    const findByCategoryOrName = useCallback(
        name => {
            // buscar por descripción si al menos una palabra coincide con la descripción
            // o buscar por categoría si todas las palabras coinciden con la categoría

            const filteredProducts = allProducts.filter(
                product =>
                    product.descripcion
                        .toLowerCase()
                        .split(' ')
                        .includes(name.toLowerCase()) ||
                    product.categoria_nombre
                        ?.toLowerCase()
                        .includes(name.toLowerCase()),
            );

            setProducts(filteredProducts);
        },
        [allProducts],
    );

    return (
        <ProductsContext.Provider
            value={{
                products,
                offerProducts,
                loadProducts,
                loadMoreProducts,
                filterProducts,
                bestProductsSellers,
                fiveStarProducts,
                findByCategoryOrName,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsContext, ProductsProvider };
