import './ReviewForm.css';
import { fetchReviews } from '../../../API/Products.API';
import { useEffect, useState } from 'react';

function ReviewsList({ productId }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews(productId).then(data => setReviews(data));
    }, [productId]);

    return (
        <div>
            <h3>Opiniones</h3>
            {reviews.length === 0 ? (
                <p>No hay opiniones para este producto.</p>
            ) : (
                reviews.map(review => (
                    <div key={review.id} className="review-item">
                        <p>
                            <strong>Calificación:</strong> {review.calificacion}
                        </p>
                        <p>
                            <strong>Comentario:</strong> {review.comentario}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default ReviewsList;
