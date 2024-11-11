import { useCallback, useContext, useEffect, useState } from 'react';
import {
    deleteFavoriteProduct,
    getFavoriteProducts,
} from '../../API/Products.API';
import { UserContext } from '../../provider/UserContext';
import DashBoard from '../../layouts/DashBoard';
import { CiViewList } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/elements/Slider';
import { MdDeleteOutline } from 'react-icons/md';

const Favorite = () => {
    const [favorite, setFavorite] = useState([]);
    const [error, setError] = useState(null);
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getFavorite = async () => {
            try {
                const products = await getFavoriteProducts(userData.id);
                setFavorite(products);
            } catch (error) {
                setError('No se encontraron artículos favoritos');
            }
        };

        getFavorite();
    }, [userData]);

    const handleRemove = useCallback(
        async favoriteId => {
            setError(null);
            const res = await deleteFavoriteProduct(userData.id, favoriteId);

            if (res) {
                setFavorite(favorite.filter(item => item.id !== favoriteId));
            } else {
                setError('No se pudo eliminar el producto de tus favoritos');
            }
        },
        [userData, favorite],
    );

    return (
        <DashBoard>
            <section className="user-dashboard-container history-container">
                {favorite.length > 0 && <h2>Artículos Favoritos</h2>}

                {favorite.map(item => (
                    <div key={item.id} className="favorite-item">
                        <span>
                            <p>{item.descripcion}</p>

                            <MdDeleteOutline
                                size={48}
                                onClick={() => handleRemove(item.id)}
                            />
                        </span>

                        <Slider>
                            {item.imagenes.map((image, index) => (
                                <img
                                    key={image + index}
                                    src={`/images/${image}`}
                                    alt={item.descripcion}
                                />
                            ))}
                        </Slider>
                    </div>
                ))}

                {favorite.length === 0 && (
                    <div className="dashboard-empty">
                        <CiViewList size={128} />

                        <p>
                            <strong>
                                No tienes ningún artículo en tus favoritos
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

                {error && <p>{error}</p>}
            </section>
        </DashBoard>
    );
};

export default Favorite;
