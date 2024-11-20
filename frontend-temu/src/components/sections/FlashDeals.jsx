import './FlashDeals.css';
import Slider from '../elements/Slider';
import { useContext } from 'react';
import { ProductsContext } from '../../provider/ProductsContext';
import { Link } from 'react-router-dom';
import SmallBanner from './themes/SmallBanner';
import { useCountry } from '../../provider/useCountry';

const FlashDeals = () => {
    const { offerProducts } = useContext(ProductsContext);
    const { formatCurrency } = useCountry();

    return (
        <section className="flash-deals-section max-width">
            <div className="flash-deals-container">
                <SmallBanner />

                <Slider>
                    {offerProducts.map(product => (
                        <Link
                            key={product.id}
                            className="flash-deal-item"
                            to={`/product/${product.id}`}
                        >
                            <img
                                src={`/images/${product.imagenes[0]}`}
                                className="product-image"
                            />

                            <p className="product-name">
                                {product.descripcion.substring(0, 30)}
                            </p>

                            <p className="product-price">
                                <span className="current-price">
                                    {formatCurrency(
                                        product.precio_con_descuento,
                                    )}
                                </span>

                                <span className="old-price">
                                    {formatCurrency(product.precio)}
                                </span>
                            </p>
                        </Link>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default FlashDeals;
