import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useState } from 'react';
import { FaLock } from 'react-icons/fa6';
import { RiSecurePaymentLine } from 'react-icons/ri';

const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);

    return (
        <DashBoard>
            <section className="user-dashboard-container">
                <div>
                    <h2>Métodos de pago</h2>
                    <small>
                        <FaLock color="#0b8900" />
                        Todos los datos están cifrados
                    </small>
                </div>

                <div className="payment-container">
                    <RiSecurePaymentLine size={128} />
                    <p>
                        <strong>
                            Guarda tus tarjetas para hacer el pedido más rápido
                        </strong>
                    </p>

                    <button className="orange-button">
                        Agregar método de pago
                    </button>
                </div>

                <div>
                    {paymentMethods.map(item => (
                        <div key={item.id} className="direction-item"></div>
                    ))}
                </div>
            </section>
        </DashBoard>
    );
};

export default PaymentMethods;
