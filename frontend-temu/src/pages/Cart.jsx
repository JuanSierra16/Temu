import './Cart.css';
import SimpleNav from '../components/sections/navbar/SimpleNav';
import Footer from '../components/sections/Footer';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { FiShoppingCart } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { CartContext } from '../provider/CartContext';
import { UserContext } from '../provider/UserContext';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../components/sections/ProductGrid';
import { IoIosLock } from 'react-icons/io';
import { AiOutlineSafety } from 'react-icons/ai';
import ModalLogin from '../components/sections/navbar/ModalLogin';
import CartProduct from '../components/elements/CartProduct';

const Cart = () => {
    const { cart, cartTotalCost } = useContext(CartContext);
    const { userIsLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const certificateCards = Object.values(
        import.meta.glob(
            '../assets/certificate-cards/*.{png,jpg,jpeg,webp,PNG,JPEG}',
            {
                eager: true,
                query: '?url',
                import: 'default',
            },
        ),
    );

    const paymentCards = Object.values(
        import.meta.glob(
            '../assets/payment-cards/*.{png,jpg,jpeg,webp,PNG,JPEG}',
            {
                eager: true,
                query: '?url',
                import: 'default',
            },
        ),
    );

    return (
        <main>
            <SimpleNav />

            <article className="car-article max-width">
                <section className="car-left">
                    <header className="car-header">
                        <LiaShippingFastSolid size={48} />
                        <p>Envío gratis en cada pedido</p>
                    </header>

                    {cart.length === 0 && (
                        <div className="car-empty">
                            <FiShoppingCart size={48} />

                            <div className="car-empty-text">
                                <p>El carrito de compras está vacío </p>
                                <small>Agrega tus artículos favoritos</small>
                            </div>
                        </div>
                    )}

                    {cart.length > 0 && (
                        <div className="car-products">
                            {cart.map(product => (
                                <CartProduct
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}

                    {!userIsLogin && (
                        <div className="car-buttons">
                            <button
                                className="orange-button"
                                onClick={() => setShowModal(true)}
                            >
                                Iniciar sesión/Registrarse
                            </button>

                            {cart.length === 0 && (
                                <button onClick={() => navigate('/')}>
                                    Comienza a comprar
                                </button>
                            )}
                        </div>
                    )}
                </section>

                <section className="car-right">
                    <h2>Resumen del pedido</h2>

                    <div className="car-cost">
                        <p>Total ({cart.length} artículos)</p>
                        <p>$ {cartTotalCost}</p>
                    </div>

                    <button className="orange-button">
                        Hacer pedido {cart.length}
                    </button>

                    <small>
                        La disponibilidad y el precio de los artículos no están
                        garantizados hasta que se finalice el pago.
                    </small>

                    <div className="car-icons">
                        <IoIosLock size={24} />
                        <p>
                            No se te cobrará hasta que revises este pedido en la
                            página siguiente
                        </p>
                    </div>

                    <div className="car-icons">
                        <AiOutlineSafety size={24} />
                        <p>Opciones de pago seguro</p>
                    </div>

                    <p>Temu se compromete a proteger su información de pago.</p>

                    <small>
                        Seguimos los estándares PCI DSS, utilizamos un cifrado
                        sólido y realizamos revisiones periódicas de su sistema
                        para proteger su privacidad
                    </small>

                    <p>1. Métodos de pago</p>

                    <div className="car-cards">
                        {certificateCards.map(galleryItem => (
                            <img key={galleryItem} src={galleryItem} alt="" />
                        ))}
                    </div>

                    <p>2. Certificación de seguridad</p>

                    <div className="car-cards">
                        {paymentCards.map(galleryItem => (
                            <img key={galleryItem} src={galleryItem} alt="" />
                        ))}
                    </div>
                </section>
            </article>

            <article className="max-width">
                <h2 style={{ marginTop: '4rem' }}>
                    Artículos que tal vez quieras agregar
                </h2>

                <ProductGrid />
            </article>

            <Footer />

            <ModalLogin showModal={showModal} setShowModal={setShowModal} />
        </main>
    );
};

export default Cart;
