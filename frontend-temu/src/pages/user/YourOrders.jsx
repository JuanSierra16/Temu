import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useContext, useEffect, useState } from 'react';
import { BsBagX } from 'react-icons/bs';
import { fetchOrders } from '../../API/Orders.API';
import { UserContext } from '../../provider/UserContext';
import AddressComponent from '../checkout/AddressComponent';
import { useCountry } from '../../provider/UseCountry';
import Modal from '../../components/elements/Modal';
import { getProductById } from '../../API/Products.API';
import Slider from '../../components/elements/Slider';

const YourOrders = () => {
    const orderTypes = [
        'Todos',
        'Procesando',
        'Enviado',
        'Entregado',
        'Devoluciones',
    ];

    const [selectedOrderType, setSelectedOrderType] = useState(orderTypes[0]);
    const [orders, setOrders] = useState([]);
    const { userData } = useContext(UserContext);
    const { formatCurrency } = useCountry();
    const [showDetails, setShowDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        if (!userData.id) return;

        fetchOrders(userData.id).then(orders => setOrders(orders));
    }, [userData]);

    useEffect(() => {
        console.log(orders);
    }, [orders]);

    useEffect(() => {
        if (!showDetails || !selectedOrder) {
            setOrderProducts([]);
            return;
        }

        // obtener información e imágenes de todos los productos
        selectedOrder.detalles.forEach(detail => {
            getProductById(detail.producto_id).then(product => {
                const addDetail = {
                    cantidad: detail.cantidad,
                    precio: detail.precio,
                    ...product,
                };

                setOrderProducts(orderProducts => [
                    ...orderProducts,
                    addDetail,
                ]);
            });
        });
    }, [showDetails, selectedOrder]);

    return (
        <DashBoard>
            {!showDetails && (
                <div className="your-orders user-dashboard-container">
                    <section className="your-orders-types">
                        {orderTypes.map(type => (
                            <p
                                key={type}
                                onClick={() => setSelectedOrderType(type)}
                                className={`your-orders-type ${type === selectedOrderType ? 'your-orders-type-active' : ''}`}
                            >
                                {type}
                            </p>
                        ))}
                    </section>

                    <section className="your-orders-container">
                        {orders.map(order => (
                            <div key={order.id} className="your-orders-item">
                                <p>Fecha:</p>
                                <p>{order.fecha_pedido}</p>

                                <p>Total:</p>
                                <p>{formatCurrency(order.total)}</p>

                                <p>Estado:</p>
                                <p>{order.estado}</p>

                                <p>Cupon:</p>
                                <p>
                                    {order.cupon !== null
                                        ? 'No se uso cupón'
                                        : 'Se uso cupón de descuento'}
                                </p>

                                <h4 className="your-orders-address-title">
                                    Datos de Envío
                                </h4>

                                <div className="your-orders-address">
                                    <AddressComponent address={order.envio} />
                                </div>

                                <button
                                    onClick={() => {
                                        setShowDetails(true);
                                        setSelectedOrder(order);
                                    }}
                                >
                                    Ver detalles
                                </button>
                            </div>
                        ))}

                        {orders.length === 0 && (
                            <div className="dashboard-empty">
                                <BsBagX size={128} />
                                <p>No tienes pedidos</p>
                            </div>
                        )}
                    </section>
                </div>
            )}

            {showDetails && (
                <section className="your-orders-item">
                    <p>Fecha:</p>
                    <p>{selectedOrder.fecha_pedido}</p>

                    <p>Total:</p>
                    <p>{formatCurrency(selectedOrder.total)}</p>

                    <p>Estado:</p>
                    <p>{selectedOrder.estado}</p>

                    <p>Cupon:</p>
                    <p>
                        {selectedOrder.cupon !== null
                            ? 'No se uso cupón'
                            : 'Se uso cupón de descuento'}
                    </p>

                    <h4 className="your-orders-address-title">
                        Datos de Envío
                    </h4>

                    <div className="your-orders-address">
                        <AddressComponent address={selectedOrder.envio} />
                    </div>

                    <h4 className="your-orders-address-title">
                        Productos del pedido
                    </h4>

                    <div className="your-orders-products">
                        {orderProducts.map(product => (
                            <div
                                key={product.id}
                                className="your-orders-product-item"
                            >
                                <Slider>
                                    {product.imagenes.map((image, index) => (
                                        <img
                                            key={image + index}
                                            src={`/images/${image}`}
                                            alt={product.descripcion}
                                        />
                                    ))}
                                </Slider>

                                <p>
                                    Cantidad: {product.cantidad} Precio Normal:{' '}
                                    {formatCurrency(product.precio)}
                                </p>
                                <p>
                                    <strong>Descripción:</strong>{' '}
                                    {product.descripcion}
                                </p>
                            </div>
                        ))}
                    </div>

                    {selectedOrder.estado === 'procesando' && (
                        <button>Cancelar pedido</button>
                    )}

                    <button
                        onClick={() => {
                            setShowDetails(false);
                            setSelectedOrder(null);
                        }}
                    >
                        Volver
                    </button>
                </section>
            )}
        </DashBoard>
    );
};

export default YourOrders;
