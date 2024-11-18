import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useContext } from 'react';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { UserContext } from '../../provider/UserContext';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const AccountSecurity = () => {
    const { userData } = useContext(UserContext);

    return (
        <DashBoard>
            <section className="user-dashboard-container">
                <div className="account-security-icon">
                    <AiFillSafetyCertificate size={48} />

                    <div>
                        <h4>Tu cuenta está protegida</h4>
                        <p>
                            Tu cuenta de Temu está protegida por seguridad
                            avanzada. Mantener actualizada esta información
                            protege aún más tu cuenta.
                        </p>
                    </div>
                </div>

                <div className="account-security-item">
                    <div>
                        <p>Número de teléfono celular</p>
                        <p>{userData.phone_number || 'No registrado'}</p>
                    </div>
                </div>

                <div className="account-security-item">
                    <div>
                        <p>Correo electrónico</p>
                        <p>{userData.email}</p>
                    </div>
                </div>

                <div className="account-security-item">
                    <div>
                        <p>Contraseña</p>
                        <p>********</p>
                    </div>
                </div>

                <h3>Cuentas de terceros</h3>

                {userData.nombre_plataforma && (
                    <p>Plataforma vinculada: {userData.nombre_plataforma}</p>
                )}

                <div className="account-security-item">
                    <span>
                        <FaGoogle size={32} />
                        <p>Google</p>
                    </span>
                </div>

                <div className="account-security-item">
                    <span>
                        <FaFacebook size={32} />
                        <p>Facebook</p>
                    </span>
                </div>

                <div className="account-security-item">
                    <span>
                        <FaApple size={32} />
                        <p>Apple</p>
                    </span>
                </div>

                <div className="account-security-item">
                    <span>
                        <FaXTwitter size={32} />
                        <p>Twitter</p>
                    </span>
                </div>
            </section>
        </DashBoard>
    );
};

export default AccountSecurity;
