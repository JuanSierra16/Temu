import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../provider/UserContext';
import { FaUser } from 'react-icons/fa';

const Profile = () => {
    const { userData, updateSizeMeasurements, loginError } =
        useContext(UserContext);
    const sizes = ['IN,LBS', 'CM,KG'];
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        medida_pecho: 0,
        medida_cintura: 0,
        medida_cadera: 0,
        estatura: 0,
        peso: 0,
        unidad_medida: sizes[0],
    });

    const handleFormChange = e => {
        const { name, value, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'number' ? value.replace(/^0.00|^0/g, '') : value,
        });
    };

    const saveChanges = async e => {
        setSaving(true);
        e.preventDefault();

        await updateSizeMeasurements(
            formData.username,
            formData.medida_pecho,
            formData.medida_cintura,
            formData.medida_cadera,
            formData.estatura,
            formData.peso,
            formData.unidad_medida,
        );

        setSaving(false);
    };

    useEffect(() => {
        setFormData({
            username: userData.username || '',
            medida_pecho: userData.medidas?.medida_pecho,
            medida_cintura: userData.medidas?.medida_cintura || 0,
            medida_cadera: userData.medidas?.medida_cadera || 0,
            estatura: userData.medidas?.estatura || 0,
            peso: userData.medidas?.peso || 0,
            unidad_medida: userData.medidas?.unidad_medida || sizes[0],
        });
    }, [userData]);

    return (
        <DashBoard>
            <section className="user-dashboard-container">
                <div className="profile-icon">
                    <FaUser size={64} />
                    <div>
                        <p>{userData.username}</p>
                        <p>{userData.email}</p>
                    </div>
                </div>

                <form
                    onSubmit={e => {
                        if (!saving) {
                            saveChanges(e);
                        }
                    }}
                    className="profile-form"
                    id="profile-form"
                >
                    <label htmlFor="username">Nombres</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleFormChange}
                        required
                    />

                    <h4>Medidas</h4>

                    <select
                        id="unidad-medida"
                        name="unidad_medida"
                        value={formData.unidad_medida}
                        onChange={handleFormChange}
                    >
                        {sizes.map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <div>
                        <div>
                            <label htmlFor="medida_pecho">
                                Medida de pecho
                            </label>
                            <input
                                id="medida_pecho"
                                name="medida_pecho"
                                type="number"
                                min="0"
                                max="1000"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.medida_pecho || 0}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="medida_cintura">
                                Medida de cintura
                            </label>
                            <input
                                id="medida_cintura"
                                name="medida_cintura"
                                type="number"
                                min="0"
                                max="1000"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.medida_cintura || 0}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="medida_cadera">
                                Medida de cadera
                            </label>
                            <input
                                id="medida_cadera"
                                name="medida_cadera"
                                type="number"
                                min="0"
                                max="1000"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.medida_cadera || 0}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="estatura">Estatura</label>
                            <input
                                id="estatura"
                                name="estatura"
                                type="number"
                                min="0"
                                max="1000"
                                step="0.01"
                                placeholder="0.01"
                                value={formData.estatura || 0}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="peso">Peso</label>
                            <input
                                id="peso"
                                name="peso"
                                type="number"
                                min="0"
                                max="500"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.peso || 0}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>

                    <button
                        className="orange-button"
                        type="submit"
                        disabled={saving}
                    >
                        Guardar
                    </button>

                    {loginError && <p>{loginError}</p>}
                </form>
            </section>
        </DashBoard>
    );
};

export default Profile;
