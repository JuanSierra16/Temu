import './YourOrders.css';
import DashBoard from '../../layouts/DashBoard';
import { useState } from 'react';
import { BsBagX } from 'react-icons/bs';

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

    return (
        <DashBoard>
            <section className="your-orders">
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
                        <div key={order}>{order}</div>
                    ))}

                    {orders.length === 0 && (
                        <div className="your-orders-empty">
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
