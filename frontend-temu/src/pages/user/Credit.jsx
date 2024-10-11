import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useState } from 'react';
import { FaLock, FaCreditCard } from 'react-icons/fa';

const Credit = () => {
    const [coupons, setCoupons] = useState([]);

    return (
        <DashBoard>
            <section className="user-dashboard-container">
                <div>
                    <h2>Saldo de crédito</h2>
                    <small>
                        <FaLock color="#0b8900" />
                        Todos los datos están cifrados
                    </small>
                </div>

                <div>
                    <h4>Total (COP):</h4>
                    <p>$ 0.00</p>
                </div>

                {coupons.length === 0 && (
                    <div className="dashboard-empty">
                        <FaCreditCard size={128} />
                        <p>Aún no hay elementos en tu historial</p>
                    </div>
                )}
            </section>
        </DashBoard>
    );
};

export default Credit;
