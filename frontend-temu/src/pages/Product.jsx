import './Product.css';
import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';
import { FaUser, FaCheck } from 'react-icons/fa';
import { FaShippingFast } from 'react-icons/fa';
import { products } from '../utils/products';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { PiPlantDuotone } from 'react-icons/pi';
import { AiOutlineSafety } from 'react-icons/ai';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getProducts } from '../API/Products.API';
import ProductGrid from '../components/sections/ProductGrid';
import { useParams } from 'react-router-dom';
import { CartContext } from '../provider/CartContext';
import CartPanel from '../components/sections/CartPanel';

const Product = () => {
    // test
    const userInfo = {
        icon: <FaUser size={64} />,
        username: 'Nombre de empresas/persona',
        followers: Math.floor(Math.random() * 1000),
        sales: Math.floor(Math.random() * 1000),
        qualification: Math.floor(Math.random() * 5),
    };

    // test, productId = products buscar por titulo
    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState({});
    const [productsList, setProductsList] = useState([]);

    const { addCart } = useContext(CartContext);

    const handleLoadMore = useCallback(async () => {
        const newProducts = await getProducts();
        setProductsList(prevProducts => [...prevProducts, ...newProducts]);
    }, []);

    useEffect(() => {
        const URIDecode = decodeURIComponent(productId);
        handleLoadMore();
        setProductInfo(products.find(product => product.title === URIDecode));
    }, [handleLoadMore, productId]);

    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="product-page-container">
                <section className="max-width product-panels">
                    <div className="product-left-container">
                        <div className="product-images">
                            <div className="product-small-images">
                                {/* Test */}
                                {Array(4)
                                    .fill(productInfo?.img)
                                    .map((img, index) => (
                                        <img
                                            key={index}
                                            src={`/products/${img}`}
                                            alt=""
                                        />
                                    ))}
                            </div>

                            <div className="product-big-image">
                                <img
                                    src={`/products/${productInfo?.img}`}
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="product-user-info-container">
                            <div className="product-user">
                                {userInfo.icon}

                                <div>
                                    <h4>{userInfo.username}</h4>

                                    <div className="product-user-info">
                                        <p>Seguidores {userInfo.followers} |</p>
                                        <p>#Ventas {userInfo.sales} |</p>
                                        <p>
                                            Calificación{' '}
                                            {userInfo.qualification}
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
                            <p>
                                Descripción producto Descripción producto
                                Descripción producto Descripción producto
                                Descripción producto Descripción producto
                                Descripción producto Descripción producto
                                Descripción producto Descripción producto
                                Descripción producto Descripción producto
                            </p>

                            <div>
                                <p>{userInfo.username}</p>
                                <p>#Ventas {userInfo.sales}</p>
                            </div>
                        </div>

                        <div className="product-price-info">
                            <h3>Precio de descuento {productInfo?.price}</h3>
                            <p>Descuento {productInfo?.price}</p>
                            <p>Precio sin descuento {productInfo?.price}</p>
                        </div>

                        <div className="product-offer">
                            <div className="product-offer-item">
                                <FaCheck />
                                <p>Envío gratis para ti</p>
                            </div>

                            <p>Oferta exclusiva</p>
                        </div>

                        <div className="product-info">
                            <p>
                                Cantidad (Disponible):{' '}
                                {productInfo?.quantity ?? 10}
                            </p>

                            <div className="product-quantity">
                                <p>Cant</p>

                                <select name="quantity" id="">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            </div>

                            <button
                                className="product-cart orange-button"
                                onClick={() => addCart(productInfo)}
                            >
                                <p>Agregar al carrito</p>
                                <p>52% de descuento</p>
                            </button>
                        </div>

                        <div className="product-conditions">
                            <div>
                                <div className="product-conditions-item-icon">
                                    <FaShippingFast size={32} />
                                    <p>Envío gratis en cada pedido</p>
                                </div>

                                <div className="product-conditions-item-list">
                                    <small>Entrega: Fecha de llegada?</small>
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
                                <p>
                                    Programa de plantación de árboles Temu (14M
                                    + de árboles) {'>'}
                                </p>
                            </div>

                            <hr />

                            <div className="product-conditions-item">
                                <AiOutlineSafety size={32} />
                                <p>Seguridad en las compras {'>'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <ProductGrid
                    productsList={productsList}
                    handleLoadMore={handleLoadMore}
                />
            </article>

            <CartPanel />
            <Footer />
        </main>
    );
};

export default Product;
