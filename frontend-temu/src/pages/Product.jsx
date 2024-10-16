import './Product.css';
import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';
import { FaUser, FaCheck } from 'react-icons/fa';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { PiPlantDuotone } from 'react-icons/pi';
import { AiOutlineSafety } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import ProductGrid from '../components/sections/ProductGrid';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../provider/CartContext';
import CartPanel from '../components/sections/CartPanel';
import { getProductById } from '../API/Products.API';
import { ProductsContext } from '../provider/ProductsContext';

const Product = () => {
    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState({
        id: 0,
        descripcion: '',
        imagenes: [],
    });
    const [bigImage, setBigImage] = useState('');
    const [notFoundImages, setNotFoundImages] = useState([]);
    const { addCart } = useContext(CartContext);
    const { loadProducts } = useContext(ProductsContext);

    const handleImageError = img => {
        setNotFoundImages(prev => [...prev, img]);
    };

    useEffect(() => {
        const URIDecode = decodeURIComponent(productId);

        getProductById(URIDecode).then(data => {
            setProductInfo(data);
            setBigImage(data.imagenes[0]);
        });

        loadProducts();
    }, [productId]);

    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="product-page-container">
                <section className="max-width product-panels">
                    <div className="product-left-container">
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
                            </div>
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
                            </div>

                            <div className="product-user-buttons">
                                <button>Seguir</button>
                                <button>Ver todos (#)</button>
                            </div>
                        </div>
                    </div>

                    <div className="product-right-container">
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
                                {productInfo.precio_con_descuento}
                            </h3>
                            <p className="orange-text">
                                Descuento {productInfo.porcentaje_descuento}
                            </p>
                            <p>Precio sin descuento {productInfo.precio}</p>
                        </div>

                        <div className="product-offer">
                            <div className="product-offer-item">
                                <FaCheck />
                                <p>Envío gratis para ti</p>
                            </div>

                            <p>Oferta exclusiva</p>
                        </div>

                        <div className="product-info">
                            <p>Cantidad (Disponible): {productInfo.stock}</p>

                            <div className="product-quantity">
                                <p>Cant</p>

                                <select name="quantity" id="">
                                    {[...Array(productInfo.stock).keys()].map(
                                        (item, index) => (
                                            <option
                                                key={index}
                                                value={index + 1}
                                            >
                                                {index + 1}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>

                            <button
                                className="product-cart orange-button"
                                onClick={() => addCart(productInfo)}
                            >
                                Agregar al carrito
                            </button>
                        </div>

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
                    </div>
                </section>

                <ProductGrid />
            </article>

            <CartPanel />
            <Footer />
        </main>
    );
};

export default Product;
