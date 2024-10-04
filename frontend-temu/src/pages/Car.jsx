import './Car.css';
import SimpleNav from '../components/sections/navbar/SimpleNav';
import Footer from '../components/sections/Footer';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { FiShoppingCart } from 'react-icons/fi';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CarContext } from '../provider/CarContext';
import { UserContext } from '../provider/UserContext';
import { Navigate } from 'react-router-dom';
import ProductGrid from '../components/sections/ProductGrid';
import { getProducts } from '../API/Products.API';
import { IoIosLock } from 'react-icons/io';
import { AiOutlineSafety } from 'react-icons/ai';

const Car = () => {
    const { car, carTotalCost } = useContext(CarContext);
    const { userIsLogin } = useContext(UserContext);

    const [productsList, setProductsList] = useState([]);

    const handleLoadMore = useCallback(async () => {
        const newProducts = await getProducts();
        setProductsList(prevProducts => [...prevProducts, ...newProducts]);
    }, []);

    useEffect(() => {
        handleLoadMore();
    }, [handleLoadMore]);

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

                    {car.length === 0 && (
                        <div className="car-empty">
                            <FiShoppingCart size={48} />

                            <div className="car-empty-text">
                                <p>El carrito de compras está vacío </p>
                                <small>Agrega tus artículos favoritos</small>
                            </div>
                        </div>
                    )}

                    {!userIsLogin && (
                        <div className="car-buttons">
                            <button className="orange-button">
                                Iniciar sesión/Registrarse
                            </button>

                            <button onClick={() => Navigate('/')}>
                                Comienza a comprar
                            </button>
                        </div>
                    )}
                </section>

                <section className="car-right">
                    <h2>Resumen del pedido</h2>

                    <div className="car-cost">
                        <p>Total (0 artículos)</p>
                        <p>$ {carTotalCost}</p>
                    </div>

                    <button className="orange-button">
                        Hacer pedido {car.length}
                    </button>

                    <small>
                        ! La disponibilidad y el precio de los artículos no
                        están garantizados hasta que se finalice el pago.
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
                <p>Artículos que tal vez quieras agregar</p>

                <ProductGrid
                    productsList={productsList}
                    handleLoadMore={handleLoadMore}
                />
            </article>

            <Footer />
        </main>
    );
};

export default Car;
