import './UserDashboard.css';

import { BsBagX } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';

import { getProductById } from '../../API/Products.API';
import { cancelOrder, fetchOrders } from '../../API/Orders.API';
import { UserContext } from '../../provider/UserContext';
import { useCountry } from '../../provider/UseCountry';

import DashBoard from '../../layouts/DashBoard';
import Slider from '../../components/elements/Slider';
import AddressComponent from '../checkout/AddressComponent';

const YourOrders = () => {
    const orderTypes = [
        'Todos',
        'Procesando',
        'Cancelado',
        'Enviado',
        'Entregado',
        'Devoluciones',
    ];

    const { formatCurrency } = useCountry();
    const { userData } = useContext(UserContext);

    const [selectedOrderType, setSelectedOrderType] = useState(orderTypes[0]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userData.id) return;

        fetchOrders(userData.id).then(orders => setOrders(orders));
    }, [userData]);

    useEffect(() => {
        if (!showDetails || !selectedOrder) {
            return;
        }

        setOrderProducts([]);

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

    const handleCancelOrder = async () => {
        if (!selectedOrder || !selectedOrder.id || loading) return;
        else if (selectedOrder.estado.toLowerCase() !== 'procesando') {
            setError('Solo se pueden cancelar pedidos en estado "Procesando"');
            return;
        }

        setError(null);
        setLoading(true);
        const res = await cancelOrder(selectedOrder.id);

        if (res) {
            const newOrders = orders.map(order => {
                if (order.id === selectedOrder.id) {
                    return {
                        ...order,
                        estado: 'Cancelado',
                    };
                }

                return order;
            });

            setSelectedOrder(
                newOrders.find(order => order.id === selectedOrder.id),
            );
            setOrders(newOrders);
        } else {
            setError('Error al cancelar el pedido');
        }

        setLoading(false);
    };

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

                    <p>Cupón:</p>
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
                        <button onClick={handleCancelOrder} disabled={loading}>
                            Cancelar pedido
                        </button>
                    )}

                    <button
                        onClick={() => {
                            setShowDetails(false);
                            setSelectedOrder(null);
                        }}
                        disabled={loading}
                    >
                        Volver
                    </button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </section>
            )}
        </DashBoard>
    );
};

export default YourOrders;
