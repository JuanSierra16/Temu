import './ProductPrev.css';
import { useContext } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../provider/CartContext';

const ProductPrev = ({ product }) => {
    const { addCart } = useContext(CartContext);
    const navigate = useNavigate();

    const goToProduct = () => {
        navigate(`/product/${encodeURIComponent(product.id)}`);
    };

    return (
        <div className="product-prev-link">
            <div className="product-prev">
                <img
                    src={`/images/${product.imagenes[0]}`}
                    alt=""
                    onClick={goToProduct}
                />

                <small onClick={goToProduct}>{product.descripcion}</small>

                <div className="product-prev-container">
                    <div onClick={goToProduct}>
                        {product.precio_con_descuento && (
                            <>
                                <p className="product-prev-price">
                                    ${product.precio_con_descuento}
                                </p>
                                <small className="product-prev-offer">
                                    ${product.precio}
                                </small>
                            </>
                        )}
                        {!product.precio_con_descuento && (
                            <p className="product-prev-price">
                                ${product.precio}
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
