import './Checkout.css';

const AddressComponent = ({ address }) => {
    return (
        <div className="address-component cookieCard">
            <p>
                <strong>{address.nombre}</strong>{' '}
                <strong>{address.apellido}</strong> {address.telefono}
            </p>
            <p className="orange-text">{address.numero_direccion}</p>
            <p>
                <strong>
                    {address.municipio} {address.departamento}{' '}
                    {address.codigo_postal}, {address.pais}
                </strong>
            </p>
            <p>{address.informacion_adicional}</p>
        </div>
    );
};

export default AddressComponent;
