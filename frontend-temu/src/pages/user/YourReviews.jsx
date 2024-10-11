import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useState } from 'react';
import { SlEnvolopeLetter } from 'react-icons/sl';

const YourReviews = () => {
    const [reviews, setReviews] = useState([]);

    return (
        <>
            <DashBoard>
                <section className="your-reviews">
                    <div className="your-reviews-container">
                        {reviews.map(review => (
                            <div key={review}>{review}</div>
                        ))}
                    </div>

                    {reviews.length === 0 && (
                        <div className="dashboard-empty">
                            <SlEnvolopeLetter size={128} />
                            <p>No tienes ninguna reseña</p>
                            <p>
                                No tienes reseñas completadas o tus reseñas han
                                sido eliminadas.
                            </p>
                        </div>
                    )}
                </section>
            </DashBoard>
        </>
    );
};

export default YourReviews;
