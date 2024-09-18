import './FlashDeals.css';
import Slider from '../elements/Slider';

const FlashDeals = () => {
    const products = [
        {
            id: 1,
            name: 'Smart Watch',
            price: '82.573',
            oldPrice: '179.281',
            discount: '53%',
            image: '/products/Reloj inteligente resistente a.webp',
        },
        {
            id: 2,
            name: 'Bolso Rojo',
            price: '19.501',
            oldPrice: '43.563',
            discount: '55%',
            image: '/products/Bolso-rojo.webp',
        },
        {
            id: 3,
            name: 'Zapatos de mujer',
            price: '29.501',
            oldPrice: '63.563',
            discount: '55%',
            image: '/products/Zapatos de mujer.webp',
        },
        {
            id: 4,
            name: 'Reloj de pulsera',
            price: '8.712',
            oldPrice: '43.563',
            discount: '80%',
            image: '/products/Reloj de pulsera.webp',
        },
        {
            id: 5,
            name: 'Zapatos de hombre',
            price: '29.501',
            oldPrice: '63.563',
            discount: '55%',
            image: '/products/Zapatos de hombre.webp',
        },
        {
            id: 6,
            name: 'Proyector 4k',
            price: '798.167',
            oldPrice: '361.142',
            discount: '54%',
            image: '/products/Proyector 4k.webp',
        },
        {
            id: 7,
            name: 'Fajas moldeadoras',
            price: '8.029',
            oldPrice: '30.099',
            discount: '73%',
            image: '/products/Fajas moldeadoras.webp',
        },
        {
            id: 8,
            name: 'Moon lamp',
            price: '56.358',
            oldPrice: '177.254',
            discount: '68%',
            image: '/products/Moon lamp.webp',
        },
        {
            id: 9,
            name: 'Cortadora de pelo',
            price: '15.434',
            oldPrice: '46.126',
            discount: '66%',
            image: '/products/Cortadora de pelo.webp',
        },
    ];

    return (
        <section className="flash-deals-section">
            <div className="flash-deals-header">
                <h2 className="flash-deals-title">⚡ Ofertas relámpago ⚡</h2>
            </div>

            <div className="flash-deals-container">
                <Slider>
                    <div className="flash-deals-banner">
                        {products.map(product => (
                            <div key={product.id} className="flash-deal-item">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">
                                    <span className="current-price">
                                        ${product.price}
                                    </span>
                                    <span className="old-price">
                                        ${product.oldPrice}
                                    </span>
                                    <span className="discount">
                                        -{product.discount}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default FlashDeals;
