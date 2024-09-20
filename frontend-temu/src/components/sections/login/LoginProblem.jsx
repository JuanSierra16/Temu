const LoginProblem = ({ setShowResetPassword }) => {
    return (
        <section className="login-problem">
            <div>
                <h3>¿Tienes problemas para iniciar sesión?</h3>
            </div>

            <p>
                Si registraste una cuenta con tu dirección de email, pero
                olvidaste tu contraseña, puedes , puedes restablecerla.
            </p>

            <button onClick={() => setShowResetPassword(true)}>
                Restablecer Contraseña
            </button>

            <p>
                Si olvidaste tu cuenta, puedes intentar encontrar tu cuenta por
                email, número de teléfono celular o número de pedido.
            </p>

            <button>Encontrar cuenta</button>
        </section>
    );
};

export default LoginProblem;
