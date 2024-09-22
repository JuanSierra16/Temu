import { Link } from 'react-router-dom';

const LoginProblem = ({ setShowResetPassword }) => {
    return (
        <section className="login-problem">
            <div>
                <h3>¿Tienes problemas para iniciar sesión?</h3>
            </div>

            <p>
                Si registraste una cuenta con tu dirección de email, pero
                olvidaste tu contraseña puedes restablecerla.
            </p>

            <button onClick={() => setShowResetPassword(true)}>
                Restablecer Contraseña
            </button>

            <p>
                Si olvidaste tu cuenta, puedes intentar encontrar tu cuenta por
                email, número de teléfono celular o número de pedido.
            </p>

            <button>
                <Link to="/find-account" style={{ color: '#000' }}>
                    Encontrar cuenta
                </Link>
            </button>
        </section>
    );
};

export default LoginProblem;
