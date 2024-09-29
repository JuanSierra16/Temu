import './PurchaseSafe.css';
import BlackBar from '../../components/sections/BlackBar';
import NavBar from '../../components/sections/navbar/NavBar';
import Footer from '../../components/sections/Footer';
import { CiShoppingCart } from 'react-icons/ci';
import { IoShieldOutline } from 'react-icons/io5';

import safeImg from '../../assets/safe-purchase.png';

const PurchaseSafe = () => {
    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="purchase-safe">
                <section className="purchase-safe-green-color">
                    <header className="max-width purchase-safe-header">
                        <div className="purchase-safe-icon">
                            <IoShieldOutline
                                size={80}
                                className="purchase-safe-icon-items"
                            />
                            <CiShoppingCart
                                size={48}
                                className="purchase-safe-icon-items"
                            />
                        </div>

                        <div>
                            <h1>
                                Compra con confianza con el Programa de
                                Protección de Compras de Temu
                            </h1>

                            <p>
                                Obtén un reembolso completo si tu artículo no se
                                puede entregar, llega dañado o no es como se
                                describe. Es posible que se te pida que
                                devuelvas el artículo antes de que se pueda
                                emitir tu reembolso.
                            </p>
                        </div>
                    </header>
                </section>

                <section className="max-width purchase-safe-flex">
                    <div className="purchase-safe-section">
                        <h2>Programa de Protección de Compras de Temu</h2>

                        <p>
                            Obtén ayuda fácilmente en el caso de que algo salga
                            mal cuando compras en una pequeña empresa
                        </p>

                        <h2>
                            Cuáles son los artículos que reúnen las condiciones
                            para el Programa de Protección de Compras de Temu
                        </h2>

                        <ul className="purchase-safe-list">
                            <li>
                                Tu pedido no coincide con las descripciones o
                                fotos de los artículos
                            </li>

                            <li>Tu artículo llegó dañado.</li>

                            <li>
                                El artículo no se pudo enviar, llegó tarde o se
                                perdió en tránsito
                            </li>
                        </ul>
                    </div>

                    <img src={safeImg} alt="" />
                </section>

                <section className="purchase-safe-section purchase-safe-pastel-color">
                    <h2 className="max-width">
                        Te apoyamos si algo sale mal. Así es como funciona:
                    </h2>

                    <div className="max-width purchase-safe-container-flex-list">
                        <div className="purchase-safe-container">
                            <span className="purchase-safe-number">1</span>

                            <h3>Presentar una devolución</h3>

                            <p>
                                Selecciona los artículos que deseas devolver en
                                la página {'Tus pedidos'} y haz clic en el botón
                                {'Devolver/otra ayuda'}. Comparti el motivo de
                                la devolución para darte una mejor atención la
                                próxima vez. Selecciona el método de devolución
                                y haz clic en {'Enviar'}.
                            </p>
                        </div>

                        <div className="purchase-safe-container">
                            <span className="purchase-safe-number">2</span>

                            <h3>Devolver tu paquete</h3>

                            <p>
                                El plazo de devolución para la mayoría de los
                                artículos es de 90 días. Todos los artículos
                                elegibles pueden devolverse en el plazo de
                                devolución en su estado original para obtener un
                                reembolso completo. Envía el paquete en un plazo
                                de 14 días después de enviar tu devolución.
                            </p>
                        </div>

                        <div className="purchase-safe-container">
                            <span className="purchase-safe-number">3</span>

                            <h3>Obtener un reembolso</h3>

                            <p>
                                Si tu pedido es elegible para el Programa de
                                Protección de Compras de Temu, recibirás un
                                reembolso por tus artículos. Puedes optar por
                                recibir el reembolso como crédito Temu o en tu
                                método de pago original. Recibirás una
                                confirmación cuando se realice el reembolso.
                            </p>
                        </div>
                    </div>
                </section>
            </article>

            <Footer />
        </main>
    );
};

export default PurchaseSafe;
