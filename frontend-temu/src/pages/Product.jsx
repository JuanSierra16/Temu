import './Product.css';

import { useContext, useEffect, useState } from 'react';

import { FaHeart, FaShippingFast, FaUser, FaCheck } from 'react-icons/fa';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { PiPlantDuotone } from 'react-icons/pi';
import { AiOutlineSafety } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

import { addFavoriteProduct, getProductById } from '../API/Products.API';

import { CartContext } from '../provider/CartContext';
import { UserContext } from '../provider/UserContext';
import { useCountry } from '../provider/UseCountry';
import { ProductsContext } from '../provider/ProductsContext';

import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';
import ProductGrid from '../components/sections/ProductGrid';
import CartPanel from '../components/sections/CartPanel';
import ReviewForm from '../components/sections/review/ReviewForm';
import ReviewsList from '../components/sections/review/ReviewsList';

const Product = () => {
    const { productId } = useParams();
    const { formatCurrency } = useCountry();
    const { addCart, cart } = useContext(CartContext);
    const { checkLowStock } = useContext(ProductsContext);
    const { userIsLogin, userData } = useContext(UserContext);

    const [productInfo, setProductInfo] = useState({
        id: 0,
        descripcion: '',
        imagenes: [],
    });

    const [bigImage, setBigImage] = useState('');
    const [notFoundImages, setNotFoundImages] = useState([]);
    const [lowStockMessage, setLowStockMessage] = useState('');
    const [reviewsUpdated, setReviewsUpdated] = useState(false);
    const [successFavorite, setSuccessFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleImageError = img => {
        setNotFoundImages(prev => [...prev, img]);
    };

    useEffect(() => {
        const URIDecode = decodeURIComponent(productId);

        getProductById(URIDecode).then(data => {
            setProductInfo(data);
            setBigImage(data.imagenes[0]);

            const lowStockMessage = checkLowStock(data);
            setLowStockMessage(lowStockMessage);
        });
    }, [productId, checkLowStock]);

    const handleFavoriteProduct = async () => {
        const success = await addFavoriteProduct(userData.id, productInfo.id);
        setSuccessFavorite(success);
    };

    const handleReviewSubmitted = () => {
        // Actualiza la lista de reseñas después de enviar una nueva reseña
        setReviewsUpdated(!reviewsUpdated);
    };

    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="product-page-container">
                <div className="max-width product-panels">
                    <section className="product-left-container">
                        <div className="product-images">
                            <div className="product-small-images">
                                {productInfo.imagenes.map(
                                    (img, index) =>
                                        !notFoundImages.includes(img) && (
                                            <img
                                                key={index}
                                                src={`/images/${img}`}
                                                onClick={() => setBigImage(img)}
                                                onError={() =>
                                                    handleImageError(img)
                                                }
                                            />
                                        ),
                                )}
                            </div>

                            <div className="product-big-image">
                                <img src={`/images/${bigImage}`} alt="" />

                                {userIsLogin && !successFavorite && (
                                    <button onClick={handleFavoriteProduct}>
                                        <FaHeart size={32} color="#FF0000" />
                                        <p>Agregarlo a tu lista de favoritos</p>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="product-review">
                            <h3>Opiniones</h3>
                            <ReviewForm
                                productId={productId}
                                onReviewSubmitted={handleReviewSubmitted}
                            />
                            <ReviewsList
                                productId={productId}
                                reviewsUpdated={reviewsUpdated}
                            />
                        </div>

                        <div className="product-user-info-container">
                            <div className="product-user">
                                <FaUser size={64} />

                                <div>
                                    <h4>{productInfo.proveedor_nombre}</h4>

                                    <div className="product-user-info">
                                        <p>
                                            Seguidores{' '}
                                            {productInfo.numero_seguidores} |
                                        </p>
                                        <p>#Ventas {productInfo.ventas} |</p>
                                        <p>
                                            Calificación {productInfo.estrellas}
                                        </p>
                                    </div>
                                </div>
                                {lowStockMessage && (
                                    <p style={{ color: 'red' }}>
                                        {lowStockMessage}
                                    </p>
                                )}
                            </div>

                            <div className="product-user-buttons">
                                <button>Seguir</button>
                                <button>Ver todos (#)</button>
                            </div>
                        </div>
                    </section>

                    <section className="product-right-container">
                        <div className="product-description">
                            <p>{productInfo.descripcion}</p>

                            <div>
                                <p>{productInfo.proveedor_nombre}</p>
                                <p>#Ventas {productInfo.productos_vendidos}</p>
                            </div>
                        </div>

                        <div className="product-price-info">
                            <h3>
                                Precio de descuento{' '}
                                {formatCurrency(
                                    productInfo.precio_con_descuento,
                                )}
                            </h3>
                            <p className="orange-text">
                                Descuento {productInfo.porcentaje_descuento}
                            </p>
                            <p>
                                Precio sin descuento{' '}
                                {formatCurrency(productInfo.precio)}
                            </p>
                        </div>

                        <div className="product-offer">
                            <div className="product-offer-item">
                                <FaCheck />
                                <p>Envío gratis para ti</p>
                            </div>

                            <p>Oferta exclusiva</p>
                        </div>

                        {!cart.find(item => item.id === productInfo.id) && (
                            <div className="product-info">
                                <p>
                                    Cantidad (Disponible): {productInfo.stock}
                                </p>

                                <div className="product-quantity">
                                    <p>Cant</p>

                                    <select
                                        name="quantity"
                                        value={quantity}
                                        onChange={e =>
                                            setQuantity(e.target.value)
                                        }
                                    >
                                        {[
                                            ...Array(productInfo.stock).keys(),
                                        ].map((item, index) => (
                                            <option
                                                key={index}
                                                value={index + 1}
                                            >
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    className="product-cart orange-button"
                                    onClick={() =>
                                        addCart(productInfo, quantity)
                                    }
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        )}

                        <div className="product-conditions">
                            <div>
                                <div className="product-conditions-item-icon">
                                    <FaShippingFast size={32} />
                                    <p>Envío gratis en cada pedido</p>
                                </div>

                                <div className="product-conditions-item-list">
                                    <small>
                                        Entrega:{' '}
                                        <span className="orange-text">
                                            {productInfo.fecha_entrega}
                                        </span>
                                    </small>
                                    <small>
                                        Obtén un crédito de $4.000 por entrega
                                        tardía ?
                                    </small>
                                    <small>
                                        Empresa de mensajería: Logo empresas de
                                        mensajería
                                    </small>
                                </div>
                            </div>

                            <div className="product-conditions-item">
                                <MdOutlineAssignmentReturn size={32} />
                                <p>
                                    Devoluciones: 90 días Ajuste de precios
                                    {'>'}
                                </p>
                            </div>

                            <div className="product-conditions-item">
                                <PiPlantDuotone size={24} />

                                <Link
                                    to="/tree-landing"
                                    className="orange-text"
                                    target="_blank"
                                >
                                    Programa de plantación de árboles Temu (14M
                                    + de árboles) {'>'}
                                </Link>
                            </div>

                            <hr />

                            <div className="product-conditions-item">
                                <AiOutlineSafety size={32} />
                                <Link
                                    to="/purchase-safe"
                                    className="orange-text"
                                    target="_blank"
                                >
                                    Seguridad en las compras {'>'}
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>

                <ProductGrid />
            </article>

            <CartPanel />
            <Footer />
        </main>
    );
};

export default Product;
