import './ProductGrid.css';
import ProductPrev from '../elements/ProductPrev';
import { FaAngleDown } from 'react-icons/fa';
import { memo, useContext } from 'react';
import { ProductsContext } from '../../provider/ProductsContext';

const ProductGrid = memo(() => {
    const { products, loadMoreProducts } = useContext(ProductsContext);

    return (
        <>
            <section className="max-width product-grid">
                {products.map(product => (
                    <ProductPrev key={product.id} product={product} />
                ))}
            </section>

            <div className="max-width product-button">
                <button className="orange-button" onClick={loadMoreProducts}>
                    Ver más <FaAngleDown />
                </button>
            </div>
        </>
    );
});

ProductGrid.displayName = 'ProductGrid';
export default ProductGrid;
