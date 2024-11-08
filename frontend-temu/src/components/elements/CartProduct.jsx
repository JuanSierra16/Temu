import { useContext } from 'react';
import { CartContext } from '../../provider/CartContext';
import { MdDeleteOutline } from 'react-icons/md';

const CartProduct = ({ product }) => {
    const { removeCart, setQuantity, setProductAttribute } =
        useContext(CartContext);

    return (
        <div key={product.descripcion} className="car-product">
            <img src={`/images/${product.imagenes[0]}`} alt="" />

            <div className="car-product-info">
                <div className="car-product-title">
                    <p>{product.descripcion}</p>

                    <MdDeleteOutline
                        size={48}
                        className="car-product-delete-icon"
                        onClick={() => removeCart(product)}
                    />
                </div>

                {product.precio_con_descuento && (
                    <p className="orange-text">
                        Oferta especial | por tiempo limitado
                    </p>
                )}

                <div className="car-product-price">
                    {product.precio_con_descuento && (
                        <span className="orange-text">
                            ${product.precio_con_descuento}
                        </span>
                    )}

                    {product.precio_con_descuento && (
                        <>
                            <del>${product.precio}</del>

                            <span className="orange-text">
                                {Math.round(
                                    (product.precio_con_descuento /
                                        product.precio) *
                                        100,
                                )}
                                %
                            </span>
                        </>
                    )}

                    {!product.precio_con_descuento && (
                        <span>${product.precio}</span>
                    )}

                    <div className="car-product-options">
                        <div>
                            <p>Cant.</p>

                            <select
                                name="product-quantity"
                                value={product.cantidad}
                                onChange={e =>
                                    setQuantity(product, e.target.value)
                                }
                            >
                                {Array.from(
                                    { length: product.stock },
                                    (_, i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="car-product-options-container">
                    <h5>Opciones de producto</h5>

                    <div className="car-product-options">
                        {Object.keys(product.atributos_seleccionados).map(
                            key => (
                                <div key={key}>
                                    <p>{key}: </p>
                                    <select
                                        name={key}
                                        onChange={e =>
                                            setProductAttribute(
                                                product,
                                                key,
                                                e.target.value,
                                            )
                                        }
                                        value={
                                            product.atributos_seleccionados[key]
                                        }
                                    >
                                        {product.atributos[key].map(
                                            (value, i) => (
                                                <option key={i} value={value}>
                                                    {value}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
