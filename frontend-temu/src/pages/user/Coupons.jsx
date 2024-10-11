import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useState } from 'react';
import { IoTicketOutline } from 'react-icons/io5';

const Coupons = () => {
    const orderTypes = ['Disponible', 'Usado', 'Vencido'];

    const [selectedCouponType, setSelectedCouponType] = useState(orderTypes[0]);
    const [coupons, setCoupons] = useState([]);

    return (
        <DashBoard>
            <section className="user-dashboard-container">
                <div className="your-orders-types">
                    {orderTypes.map(type => (
                        <p
                            key={type}
                            onClick={() => setSelectedCouponType(type)}
                            className={`your-orders-type ${type === selectedCouponType ? 'your-orders-type-active' : ''}`}
                        >
                            {type}
                        </p>
                    ))}
                </div>

                {selectedCouponType === 'Disponible' && (
                    <form action="" className="input-coupon">
                        <input
                            type="code"
                            placeholder="Ingresa el código del cupón"
                        />

                        <button type="submit">Aplicar</button>
                    </form>
                )}

                <div className="your-coupons-container">
                    {coupons.map(order => (
                        <div key={order}>{order}</div>
                    ))}

                    {coupons.length === 0 && (
                        <div className="dashboard-empty">
                            <IoTicketOutline size={128} />
                            <p>No tienes cupones disponibles</p>
                        </div>
                    )}
                </div>
            </section>
        </DashBoard>
    );
};

export default Coupons;
