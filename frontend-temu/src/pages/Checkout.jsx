import './Checkout.css';
import { useContext, useEffect, useState } from 'react';
import SimpleNav from '../components/sections/navbar/SimpleNav';
import { CartContext } from '../provider/CartContext';
import { useAddress } from '../provider/useAddress';
import Modal from '../components/elements/Modal';
import CartProduct from '../components/elements/CartProduct';
import { useCountry } from '../provider/UseCountry';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/sections/Footer';
import ModalLogin from '../components/sections/navbar/ModalLogin';
import { UserContext } from '../provider/UserContext';
import { FiShoppingCart } from 'react-icons/fi';
import { verifyCoupon } from '../API/Coupon.API';

const AddressComponent = ({ address }) => {
    return (
        <div className="address-component">
            <p>
                <strong>{address.nombre}</strong>{' '}
                <strong>{address.apellido}</strong> {address.telefono}
            </p>
            <p className="orange-text">{address.numero_direccion}</p>
            <p>
                <strong>
                    {address.municipio} {address.departamento}{' '}
                    {address.codigo_postal}, {address.pais}
                </strong>
            </p>
            <p>{address.informacion_adicional}</p>
        </div>
    );
};

const Checkout = () => {
    const { cart, cartTotalCost, cartTotalQuantity } = useContext(CartContext);
    const { addresses } = useAddress();
    const { formatCurrency } = useCountry();
    const { userIsLogin, userData, waitLogin } = useContext(UserContext);
    const navigation = useNavigate();

    const [selectAddress, setSelectAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState(null);
    const [couponDiscount, setCouponDiscount] = useState(0); // porcentaje de descuento
    const [totalCost, setTotalCost] = useState(0);

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

    const handleCheckout = () => {
        if (!userIsLogin) {
            setShowLoginModal(true);
        } else if (cart.length === 0) {
            setShowEmptyCartModal(true);
        } else if (!selectAddress) {
            setShowAddressModal(true);
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
