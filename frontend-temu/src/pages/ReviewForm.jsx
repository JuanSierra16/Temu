import './ReviewForm.css';
import React, { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { UserContext } from '../provider/UserContext';
import { addReviewProduct } from '../API/Products.API';

function ReviewForm({ productId }) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [message, setMessage] = useState('');
    const { userData, userIsLogin } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userIsLogin) {
            setMessage('Debes iniciar sesión para dejar una opinión.');
            return;
        }
        try {
            const response = await addReviewProduct (
                productId,
                reviewText,
                rating,
                userData.id
            )
            if (response) {
            setMessage('Opinión guardada correctamente.');
            setHasReviewed(true);
            }else{
                setMessage('Hubo un error al guardar tu opinión. Por favor, inténtalo de nuevo.');
            } 
        } catch (error) {
            console.error(error);
            setMessage('Hubo un error al guardar tu opinión. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            {message && <p>{message}</p>}
            {!userIsLogin ? (
                <p>Debes iniciar sesión para dejar una opinión.</p>
            ) : hasReviewed ? (
                <p>Ya has dejado una opinión sobre este producto.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Calificación de estrellas */}
                    <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        style={{ display: 'none' }}
                                    />
                                    <FaStar
                                        size={24}
                                        color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(null)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Escribe tu opinión"
                        required
                    ></textarea>
                    <button type="submit">Enviar opinión</button>
                </form>
            )}
        </div>
    );
}

export default ReviewForm;
