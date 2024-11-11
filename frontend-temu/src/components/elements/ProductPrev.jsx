import './ProductPrev.css';
import { useContext } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../provider/CartContext';
import { useCountry } from '../../provider/UseCountry';

const ProductPrev = ({ product }) => {
    const { addCart } = useContext(CartContext);
    const { currency, formatCurrency } = useCountry();
    const navigate = useNavigate();

    const goToProduct = () => {
        navigate(`/product/${encodeURIComponent(product.id)}`);
    };

    return (
        <div className="product-prev-link">
            <div className="product-prev">
                <img
                    src={`/images/${product.imagenes[0]}`}
                    alt={product.descripcion}
                    onClick={goToProduct}
                />

                <small onClick={goToProduct}>{product.descripcion}</small>

                <div className="product-prev-container">
                    <div onClick={goToProduct}>
                        {product.precio_con_descuento && (
                            <div className="product-prev-discount">
                                <p className="product-prev-price">
                                    {formatCurrency(
                                        product.precio_con_descuento *
                                            currency.exchangeRate,
                                    )}
                                </p>
                                <small className="product-prev-offer">
                                    {formatCurrency(
                                        product.precio * currency.exchangeRate,
                                    )}
                                </small>
                            </div>
                        )}
                        {!product.precio_con_descuento && (
                            <p className="product-prev-price">
                                {formatCurrency(
                                    product.precio * currency.exchangeRate,
                                )}
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
