import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';

const Directions = () => {
    const [directions, setDirections] = useState([]);

    return (
        <DashBoard>
            <section className="user-dashboard-container direction-container">
                <div>
                    {directions.length > 0 && <h2>Direcciones</h2>}

                    {directions.map(item => (
                        <div key={item.id} className="direction-item"></div>
                    ))}
                </div>

                {directions.length === 0 && (
                    <div className="dashboard-empty">
                        <FaMapMarkerAlt size={128} />
                        <p>
                            <strong>
                                No tienes ninguna dirección de envío guardada
                            </strong>
                        </p>
                        <small>
                            <FaLock color="#0b8900" />
                            Todos los datos están cifrados
                        </small>
                    </div>
                )}

                <button className="orange-button">
                    <FaMapMarkerAlt size={16} />
                    Agregar nueva dirección
                </button>
            </section>
        </DashBoard>
    );
};

export default Directions;
