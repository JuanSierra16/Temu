import { MdAddShoppingCart } from 'react-icons/md';

import './ProductPrev.css';

const ProductPrev = ({ product }) => {
    return (
        <div className="product-prev">
            <img src={`/products/${product.img}`} alt="" />

            <small>{product.title}</small>

            <div className="product-prev-price">
                <div>
                    <p>{product.offer}</p>
                    <small
                        className={`${product.offer ? 'product-prev-offer' : ''}`}
                    >
                        {product.price}
                    </small>
                </div>

                <span className="product-prev-cart">
                    <MdAddShoppingCart />
                </span>
            </div>
        </div>
    );
};

export default ProductPrev;
