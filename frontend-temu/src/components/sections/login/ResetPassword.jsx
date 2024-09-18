const ResetPassword = () => {
    return (
        <div className="login-reset-password">
            <h2>Olvidé mi contraseña</h2>

            <p>
                Ingresa tu dirección de email a continuación y te enviaremos un
                código de 6 dígitos para el restablecimiento de tu contraseña.
            </p>

            <input type="email" placeholder="Dirección de email" />

            <button className="orange-button">Enviar</button>
        </div>
    );
};

export default ResetPassword;
