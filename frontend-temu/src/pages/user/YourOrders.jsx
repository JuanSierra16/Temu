import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useContext, useEffect, useState } from 'react';
import { BsBagX } from 'react-icons/bs';
import { fetchOrders } from '../../API/Orders.API';
import { UserContext } from '../../provider/UserContext';
import AddressComponent from '../checkout/AddressComponent';
import { useCountry } from '../../provider/UseCountry';

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

    useEffect(() => {
        if (!userData.id) return;

        fetchOrders(userData.id).then(orders => setOrders(orders));
    }, [userData]);

    useEffect(() => {
        console.log(orders);
    }, [orders]);

    return (
        <DashBoard>
            <section className="your-orders user-dashboard-container">
                <div className="your-orders-types">
                    {orderTypes.map(type => (
                        <p
                            key={type}
                            onClick={() => setSelectedOrderType(type)}
                            className={`your-orders-type ${type === selectedOrderType ? 'your-orders-type-active' : ''}`}
                        >
                            {type}
                        </p>
                    ))}
                </div>

                <div className="your-orders-container">
                    {orders.map(order => (
                        <div key={order} className="your-orders-item">
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

                            <button>Ver detalles</button>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div className="dashboard-empty">
                            <BsBagX size={128} />
                            <p>No tienes pedidos</p>
                        </div>
                    )}
                </div>
            </section>
        </DashBoard>
    );
};

export default YourOrders;
