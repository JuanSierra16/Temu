import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useContext, useState } from 'react';
import { UserContext } from '../../provider/UserContext';
import { FaUser } from 'react-icons/fa';

const Profile = () => {
    const { userData } = useContext(UserContext);
    const sizes = ['IN,LBS', 'CM,KG'];
    const [selected, setSelected] = useState('IN,LBS');

    return (
        <DashBoard>
            <section className="user-dashboard-container">
                <div className="profile-icon">
                    <FaUser size={64} />
                    <div>
                        <p>{userData.name}</p>
                        <p>{userData.email}</p>
                    </div>
                </div>

                <form action="" className="profile-form">
                    <label htmlFor="name">Nombres</label>
                    <input type="text" defaultValue={userData.name} required />

                    <h4>Medidas</h4>

                    <select
                        value={selected}
                        onChange={e => setSelected(e.target.value)}
                    >
                        {sizes.map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <div>
                        <div>
                            <label htmlFor="medida-pecho">
                                Medida de pecho
                            </label>
                            <input
                                name="medida-pecho"
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                placeholder="0.0"
                            />
                        </div>

                        <div>
                            <label htmlFor="medida-cintura">
                                Medida de cintura
                            </label>
                            <input
                                name="medida-cintura"
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                placeholder="0.0"
                            />
                        </div>

                        <div>
                            <label htmlFor="medida-cadera">
                                Medida de cadera
                            </label>
                            <input
                                name="medida-cadera"
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                placeholder="0.0"
                            />
                        </div>

                        <div>
                            <label htmlFor="estatura">Estatura</label>
                            <input
                                name="estatura"
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                placeholder="0.0"
                            />
                        </div>

                        <div>
                            <label htmlFor="peso">Peso</label>
                            <input
                                name="peso"
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                placeholder="0.0"
                            />
                        </div>
                    </div>

                    <button className="orange-button">Guardar</button>
                </form>
            </section>
        </DashBoard>
    );
};

export default Profile;
