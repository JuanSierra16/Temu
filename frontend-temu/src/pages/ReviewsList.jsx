import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

function ReviewsList({ productId, reviewsUpdated }) {
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${baseURL}/products/${productId}/reviews`);
            setReviews(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error al obtener las reseñas:', error);
            setReviews([]);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [productId, reviewsUpdated]);

    return (
        <div>
            <h3>Opiniones</h3>
            {reviews.length === 0 ? (
                <p>No hay opiniones para este producto.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="review">
                        <p><strong>Calificación:</strong> {review.calificacion}</p>
                        <p><strong>Comentario:</strong> {review.comentario}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default ReviewsList;