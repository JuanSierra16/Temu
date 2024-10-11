import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useState } from 'react';
import { LuCalendarClock } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    return (
        <DashBoard>
            <section className="user-dashboard-container history-container">
                <div>
                    {history.length > 0 && <h2>Historial de compras</h2>}

                    {history.map(item => (
                        <div key={item.id} className="history-item"></div>
                    ))}
                </div>

                {history.length === 0 && (
                    <div className="dashboard-empty">
                        <LuCalendarClock size={128} />
                        <p>
                            <strong>
                                No tienes ningún artículo visto recientemente
                            </strong>
                        </p>
                        <p>
                            ¡Explora Temu para encontrar artículos increíbles
                            que te gusten!
                        </p>

                        <button
                            className="orange-button"
                            onClick={() => navigate('/')}
                        >
                            Ver artículos
                        </button>
                    </div>
                )}
            </section>
        </DashBoard>
    );
};

export default History;
