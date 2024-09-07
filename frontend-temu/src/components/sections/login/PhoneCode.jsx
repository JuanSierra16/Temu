import InputCode from '../../elements/InputCode';

const PhoneCode = ({ phonePrefix, phone }) => {
    return (
        <div className="login-col">
            <h3>Ingresa el código de verificación</h3>
            <small>
                Enviamos un código de verificación a{' '}
                <span className="login-orange">
                    {phonePrefix} {}
                    {phone}
                </span>
            </small>

            <div className="phone-code">
                <InputCode />
            </div>
        </div>
    );
};

export default PhoneCode;
