import './Checkout.css';

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../provider/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

import { useAddress } from '../../provider/useAddress';
import { useCountry } from '../../provider/UseCountry';
import { UserContext } from '../../provider/UserContext';

import { verifyCoupon } from '../../API/Coupon.API';
import { makePayment } from '../../API/Payment.API';

import Modal from '../../components/elements/Modal';
import Footer from '../../components/sections/Footer';
import SimpleNav from '../../components/sections/navbar/SimpleNav';
import ModalLogin from '../../components/sections/navbar/ModalLogin';
import CartProduct from '../../components/elements/CartProduct';
import AddressComponent from './AddressComponent';

const Checkout = () => {
    const { cart, cartTotalCost, cartTotalQuantity, clearCart } =
        useContext(CartContext);
    const { addresses } = useAddress();
    const { currency, formatCurrency } = useCountry();
    const { userIsLogin, userData } = useContext(UserContext);
    const navigation = useNavigate();

    const [selectAddress, setSelectAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState(0); // porcentaje de descuento
    const [couponId, setCouponId] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectAddress && addresses.length > 0) {
            setSelectAddress(addresses[0]);
        }
    }, [addresses, selectAddress]);

    useEffect(() => {
        setShowAddressModal(false);
    }, [selectAddress]);

    useEffect(() => {
        setShowEmptyCartModal(cart.length === 0);
    }, [cart]);

    useEffect(() => {
        setTotalCost(cartTotalCost - cartTotalCost * (couponDiscount / 100));
    }, [couponDiscount, cartTotalCost]);

    const handleCheckout = async () => {
        if (!userIsLogin) {
            setShowLoginModal(true);
        } else if (cart.length === 0) {
            setShowEmptyCartModal(true);
        } else if (!selectAddress) {
            setShowAddressModal(true);
        } else if (cartTotalCost < 0.5) {
            setError('El total debe ser mayor a ' + formatCurrency(0.5));
        } else {
            let paymentProduct = cart.map(product => ({
                id: product.id,
                nombre: product.descripcion.split(' ').slice(0, 3).join(' '),
                precio: Number(
                    parseFloat(
                        formatCurrency(
                            (product.precio_con_descuento ?? product.precio) -
                                (product.precio_con_descuento ??
                                    product.precio) *
                                    (couponDiscount / 100),
                        ).replace(/[^0-9.-]+/g, ''),
                    ) * 100,
                ).toFixed(0),
                cantidad: product.cantidad,
            }));

            const rand = function () {
                return Math.random().toString(36).substr(2); // remove `0.`
            };

            const code = rand() + rand(); // para poder saber si el pago fue exitoso
            localStorage.setItem('checkout-state', 'processing');
            localStorage.setItem('checkout-code', code);

            const data = {
                usuario_id: userData.id,
                productos: paymentProduct,
                total: totalCost,
                cupo_id: couponId,
                direccion_envio_id: selectAddress.id,
                currency: currency.acronym,
                success_url:
                    'http://localhost:5173/checkout/success?code=' + code,
                cancel_url: 'http://localhost:5173/checkout/cancel',
            };

            const res = await makePayment(data);

            if (res) {
                window.open(res.url, '_blank', 'rel=noopener noreferrer');
            }
        }
    };

    const handleCoupon = async () => {
        if (!userIsLogin) {
            setShowLoginModal(true);
        } else if (cart.length === 0) {
            setShowEmptyCartModal(true);
        } else if (couponCode === '') {
            setCouponMessage('Ingresa el código del cupón');
        } else {
            const res = await verifyCoupon(userData.id, couponCode);
            setCouponMessage(res.message);
            setCouponDiscount(res.discount);
            setCouponId(res.id);
        }
    };

    // Para saber si el pago fue exitoso
    // Las paginas de confirmación y cancelación cambian el estado del localStorage
    window.onfocus = () => {
        const checkoutState = localStorage.getItem('checkout-state') || null;

        if (checkoutState === 'success') {
            clearCart();
            localStorage.removeItem('checkout-state');
            localStorage.removeItem('checkout-code');
            navigation('/checkout/success');
        } else if (checkoutState === 'cancel') {
            localStorage.removeItem('checkout-state');
            localStorage.removeItem('checkout-code');
            setError('El pago fue cancelado o hubo un error en el proceso.');
        }
    };

    return (
        <>
            <SimpleNav />

            <main className="max-width checkout">
                <h2>Completa tu compra</h2>

                <div className="checkout-container">
                    <article>
                        <section>
                            <h4>Dirección de envío</h4>

                            {selectAddress && (
                                <AddressComponent address={selectAddress} />
                            )}

                            <button onClick={() => setShowAddressModal(true)}>
                                Seleccionar otra dirección
                            </button>
                        </section>

                        <section>
                            <h4>
                                Detalles de artículos (
                                <span className="orange-text">
                                    {cartTotalQuantity}
                                </span>
                                )
                            </h4>

                            <div>
                                {cart.map(item => {
                                    return (
                                        <CartProduct
                                            product={item}
                                            key={item.id}
                                        />
                                    );
                                })}
                            </div>
                        </section>
                    </article>

                    <article className="checkout-summary">
                        <h3>Resumen del pedido</h3>

                        <section>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Ingresa el código del cupón"
                                    value={couponCode}
                                    onChange={e =>
                                        setCouponCode(e.target.value)
                                    }
                                />

                                <button onClick={handleCoupon}>Aplicar</button>
                            </div>

                            {couponMessage && (
                                <p className="orange-text">{couponMessage}</p>
                            )}
                        </section>

                        <section>
                            <div>
                                <p>Total de artículos:</p>
                                <p>{formatCurrency(cartTotalCost)}</p>
                            </div>

                            <div className="orange-text">
                                <p>Descuento del cupón ({couponDiscount}%):</p>
                                <p>
                                    {formatCurrency(
                                        cartTotalCost * (couponDiscount / 100),
                                    )}
                                </p>
                            </div>

                            <div>
                                <p>Subtotal:</p>
                                <p>{formatCurrency(totalCost)}</p>
                            </div>
                        </section>

                        <section>
                            <div>
                                <p>Total del pedido:</p>
                                <p>{formatCurrency(totalCost)}</p>
                            </div>
                        </section>

                        <section className="checkout-green">
                            <h5>Planta con Temu</h5>

                            <p>Te invitamos a plantar un árbol</p>

                            <button
                                className="orange-button"
                                onClick={handleCheckout}
                            >
                                Finalizar compra
                            </button>

                            {error && <p className="orange-text">{error}</p>}

                            <Link
                                to="/tree-landing"
                                target="_blanck"
                                className="checkout-green"
                            >
                                Programa de plantación de árboles Temu
                            </Link>
                        </section>
                    </article>
                </div>
            </main>

            <Footer />

            <Modal show={showAddressModal} setShow={setShowAddressModal}>
                <article className="modal-addresses">
                    <section>
                        <h3>Direcciones de envío</h3>

                        {addresses.map(item => {
                            return (
                                <div
                                    key={item.id}
                                    className="modal-addresses-item"
                                >
                                    <AddressComponent address={item} />
                                    <button
                                        onClick={() => setSelectAddress(item)}
                                    >
                                        Agregar
                                    </button>
                                </div>
                            );
                        })}
                    </section>

                    <section>
                        <h4>
                            Agrega una nueva dirección de envío para tu compra
                        </h4>

                        <button onClick={() => navigation('/your-addresses')}>
                            Agregar nueva dirección
                        </button>
                    </section>
                </article>
            </Modal>

            <Modal show={showEmptyCartModal} setShow={setShowEmptyCartModal}>
                <article className="modal-addresses">
                    <div className="car-empty">
                        <FiShoppingCart size={48} />

                        <div className="car-empty-text">
                            <p>El carrito de compras está vacío </p>
                            <small>Agrega tus artículos favoritos</small>
                        </div>
                    </div>

                    <button onClick={() => navigation('/')}>
                        Continuar comprando
                    </button>
                </article>
            </Modal>

            <ModalLogin
                showModal={showLoginModal}
                setShowModal={setShowLoginModal}
            />
        </>
    );
};

export default Checkout;
