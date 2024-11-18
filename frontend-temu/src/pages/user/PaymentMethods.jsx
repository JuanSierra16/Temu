import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { FaLock } from 'react-icons/fa6';
import { RiSecurePaymentLine } from 'react-icons/ri';

import stripePayments from '../../assets/stripe-payment.png';

const PaymentMethods = () => {
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

                    <p>
                        En el momento de realizar un pago identifica la opción
                        de guardar mis datos de forma segura.
                    </p>

                    <p>Formulario al momento de pago</p>

                    <img src={stripePayments} alt="" />
                </div>
            </section>
        </DashBoard>
    );
};

export default PaymentMethods;
