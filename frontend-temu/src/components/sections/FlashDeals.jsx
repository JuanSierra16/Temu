import './FlashDeals.css';
import { FaAngleRight } from 'react-icons/fa';
import Slider from '../elements/Slider';
import { useContext } from 'react';
import { ProductsContext } from '../../provider/ProductsContext';
import { Link } from 'react-router-dom';

const FlashDeals = () => {
    const { offerProducts } = useContext(ProductsContext);

    return (
        <section className="flash-deals-section max-width">
            <div className="flash-deals-container">
                <div className="flash-deals-header">
                    <h2>⚡ Ofertas relámpago ⚡</h2>

                    <div className="flash-deals-link">
                        <p>Por tiempo limitado</p>
                        <FaAngleRight />
                    </div>
                </div>

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
                                    ${product.precio}
                                </span>

                                <span className="old-price">
                                    ${product.precio_con_descuento}
                                </span>

                                <span className="discount">
                                    {/* -{product.discount} */}
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
