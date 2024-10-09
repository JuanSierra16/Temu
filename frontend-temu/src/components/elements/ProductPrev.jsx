import { useContext } from 'react';
import './ProductPrev.css';
import { MdAddShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../provider/CartContext';

const ProductPrev = ({ product }) => {
    // test usar como link el titulo del producto
    const { addCart } = useContext(CartContext);
    const navigate = useNavigate();

    const goToProduct = () => {
        navigate(`/product/${encodeURIComponent(product.title)}`);
    };

    return (
        <div
            // to={`/product/${encodeURIComponent(product.title)}`}
            className="product-prev-link"
        >
            <div className="product-prev">
                <img
                    src={`/products/${product.img}`}
                    alt=""
                    onClick={goToProduct}
                />

                <small onClick={goToProduct}>{product.title}</small>

                <div className="product-prev-container">
                    <div onClick={goToProduct}>
                        {product.offer && (
                            <>
                                <p className="product-prev-price">
                                    ${product.offer}
                                </p>
                                <small className="product-prev-offer">
                                    ${product.price}
                                </small>
                            </>
                        )}
                        {!product.offer && (
                            <p className="product-prev-price">
                                ${product.price}
                            </p>
                        )}
                    </div>

                    <span className="product-prev-cart">
                        <MdAddShoppingCart onClick={() => addCart(product)} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductPrev;
