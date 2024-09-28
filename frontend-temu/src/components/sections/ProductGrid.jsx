import './ProductGrid.css';
import ProductPrev from '../elements/ProductPrev';
import { FaAngleDown } from 'react-icons/fa';
import { memo } from 'react';

const ProductGrid = memo(({ productsList, handleLoadMore }) => {
    return (
        <>
            <section className="max-width product-grid">
                {productsList.map(product => (
                    <ProductPrev key={product.title} product={product} />
                ))}
            </section>

            <div className="max-width product-button">
                <button className="orange-button" onClick={handleLoadMore}>
                    Ver más <FaAngleDown />
                </button>
            </div>
        </>
    );
});

ProductGrid.displayName = 'ProductGrid';
export default ProductGrid;
