import { AiFillSafetyCertificate } from 'react-icons/ai';
import { FaChevronRight } from 'react-icons/fa6';
import { BsLock } from 'react-icons/bs';
import { CiCreditCard2 } from 'react-icons/ci';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaBell } from 'react-icons/fa';

import './Compromise.css';

const Compromise = () => {
    return (
        <section className="max-width compromise">
            <div className="compromise-container">
                <div>
                    <span className="compromise-item">
                        <AiFillSafetyCertificate size={16} />
                        <p>Compromiso Temu</p>
                    </span>
                </div>

                <div className="compromise-links-container">
                    <div className="compromise-links">
                        <a href="" className="compromise-item">
                            <BsLock size={24} className="compromise-icon" />
                            Privacidad asegurada{' '}
                            <FaChevronRight
                                size={10}
                                className="compromise-arrow"
                            />
                        </a>
                        <a href="" className="compromise-item">
                            <CiCreditCard2
                                size={24}
                                className="compromise-icon"
                            />
                            Pagos seguros{' '}
                            <FaChevronRight
                                size={10}
                                className="compromise-arrow"
                            />
                        </a>
                        <a
                            href=""
                            className="compromise-item compromise-item-last"
                        >
                            <CiDeliveryTruck
                                size={24}
                                className="compromise-icon"
                            />
                            Entrega garantizada <FaChevronRight size={10} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="compromise-message">
                <a href="" className="compromise-item-message">
                    <FaBell size={24} className="compromise-icon" />
                    <span>
                        Ten cuidado con los mensajes sobre problemas de entrega
                        debido a una dirección incompleta que afirman ser del
                        Servicio Postal de Colombia (4-72)
                    </span>
                </a>
            </div>
        </section>
    );
};

export default Compromise;
