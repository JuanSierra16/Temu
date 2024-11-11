import './CartPanel.css';
import { useContext } from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { CartContext } from '../../provider/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCountry } from '../../provider/UseCountry';

const CartPanel = () => {
    const { cart, cartTotalCost } = useContext(CartContext);
    const { formatCurrency } = useCountry();
    const navigate = useNavigate();

    return (
        <div
            className={`cart-panel ${cart.length === 0 ? 'cart-panel-hidden' : ''}`}
        >
            <div className="cart-panel-title">
                <BsCartCheck size={32} />
                Subtotal
            </div>

            <p>
                <strong>{formatCurrency(cartTotalCost)}</strong>
            </p>

            <button className="orange-button">
                Hacer {cart.length <= 1 ? 'pedido' : 'pedidos'} ({cart.length})
            </button>

            <button onClick={() => navigate('/cart')}>Ir al carrito</button>

            <div className="cart-panel-products">
                {cart.map(product => (
                    <Link
                        className="cart-panel-product"
                        key={product.id}
                        to={`/product/${encodeURIComponent(product.id)}`}
                    >
                        <img src={`/images/${product.imagenes[0]}`} alt="" />
                        <p className="orange-text">
                            {formatCurrency(
                                product.precio_con_descuento ?? product.precio,
                            )}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CartPanel;
