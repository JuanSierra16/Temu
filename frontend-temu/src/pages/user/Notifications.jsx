import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    return (
        <>
            <DashBoard>
                <section className="your-reviews">
                    <div className="your-reviews-container">
                        {notifications.map(review => (
                            <div key={review}>{review}</div>
                        ))}
                    </div>

                    {notifications.length === 0 && (
                        <div className="dashboard-empty">
                            <IoIosNotificationsOutline size={128} />
                            <p>No tienes notificaciones</p>
                        </div>
                    )}
                </section>
            </DashBoard>
        </>
    );
};

export default Notifications;
