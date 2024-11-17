import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useContext, useEffect, useState } from 'react';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { getReviewByUser } from '../../API/Products.API';
import { UserContext } from '../../provider/UserContext';
import { Link } from 'react-router-dom';

const YourReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        if (!userData.id) return;

        getReviewByUser(userData.id).then(data => {
            setReviews(data);
            console.log(data);
        });
    }, [userData]);

    return (
        <>
            <DashBoard>
                <section className="your-reviews">
                    <div className="your-reviews-container">
                        {reviews.map(review => (
                            <div
                                key={review.comentario + review.id}
                                className="your-reviews-item"
                            >
                                <p>Fecha de reseña: </p>
                                <p>{review.fecha_reseña}</p>

                                <p>Calificación: </p>
                                <p>{review.calificacion}</p>

                                <p>Comentario: </p>
                                <p className="your-reviews-comment">
                                    {review.comentario}
                                </p>

                                <Link to={`/product/${review.producto_id}`}>
                                    Ver producto
                                </Link>
                            </div>
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
