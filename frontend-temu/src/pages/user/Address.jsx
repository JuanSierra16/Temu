import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { countries } from '../../utils/countriesList';
import InputPhone from '../../components/elements/InputPhone';
import { UserContext } from '../../provider/UserContext';
import {
    addAddress,
    deleteAddress,
    getAddresses,
    updateAddress,
} from '../../API/Address.API';

const Address = () => {
    const { userData } = useContext(UserContext);

    const [address, setAddress] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [phone, setPhone] = useState('');
    const [prefix, setPrefix] = useState('');
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);

    const [addressForm, setAddressForm] = useState({
        pais: countries[0],
        nombre: '',
        apellido: '',
        telefono: '',
        departamento: '',
        municipio: '',
        codigo_postal: '',
        numero_direccion: '',
        informacion_adicional: '',
    });

    useEffect(() => {
        if (userData) {
            getAddresses(userData.id).then(res => {
                setAddress(res);
            });
        }
    }, [userData]);

    const handleAddressForm = useCallback(
        ({ target }) => {
            setAddressForm({
                ...addressForm,
                [target.name]: target.value,
            });
        },

        [addressForm],
    );

    const add = useCallback(async () => {
        let data = { ...addressForm };
        data.telefono = `${prefix} ${phone}`;

        try {
            const res = await addAddress(userData.id, data);

            if (!res) {
                setError('Error al guardar la dirección');
            } else {
                data = { id: res, ...data };
                setAddress([data, ...address]);
                setShowForm(false);
                setEditing(false);
            }
        } catch (error) {
            setError('Error al guardar la dirección');
        }
    }, [address, addressForm, phone, prefix, userData.id]);

    const update = useCallback(async () => {
        let data = { ...addressForm };
        data.telefono = `${prefix} ${phone}`;

        try {
            const res = await updateAddress(data);

            if (!res) {
                setError('Error al guardar la dirección');
            } else {
                const newAddress = address.map(item => {
                    if (item.id === data.id) {
                        return data;
                    }

                    return item;
                });

                setAddress(newAddress);
                setShowForm(false);
                setEditing(false);
            }
        } catch (error) {
            setError('Error al guardar la dirección');
        }
    }, [address, addressForm, phone, prefix]);

    const handleOnSubmit = useCallback(
        async e => {
            e.preventDefault();

            if (!editing) await add();
            else await update();
        },
        [editing, add, update],
    );

    const handleOnDelete = useCallback(
        async addressItem => {
            const res = await deleteAddress(userData.id, addressItem.id);

            if (!res) {
                setError('Error al remover la dirección');
            } else {
                setAddress(address.filter(item => item.id !== addressItem.id));
            }
        },
        [address, userData.id],
    );

    const handleOnEdit = useCallback(async addressItem => {
        setAddressForm({
            ...addressItem,
        });
        setPrefix(addressItem.telefono.split(' ')[0]);
        setPhone(addressItem.telefono.split(' ')[1]);
        setShowForm(true);
        setEditing(true);
    }, []);

    useEffect(() => {
        // limpiar el formulario
        if (!showForm) {
            setAddressForm({
                pais: countries[0],
                nombre: '',
                apellido: '',
                telefono: '',
                departamento: '',
                municipio: '',
                codigo_postal: '',
                numero_direccion: '',
                informacion_adicional: '',
            });

            setPhone('');
            setError('');
            setPrefix('');
            setEditing(false);
        }
    }, [showForm]);

    return (
        <DashBoard>
            {!showForm && (
                <section className="user-dashboard-container address-container">
                    {address.length > 0 && <h2>Direcciones</h2>}

                    <div className="address-list">
                        {address.map(item => (
                            <div key={item.id} className="address-item">
                                <p>País</p>
                                <p>{item.pais}</p>
                                <p>Nombre</p>
                                <p>{item.nombre}</p>
                                <p>Apellido</p>
                                <p>{item.apellido}</p>
                                <p>Teléfono</p>
                                <p>{item.telefono}</p>
                                <p>Región/Estado/Provincia</p>
                                <p>{item.departamento}</p>
                                <p>Localidad/Ciudad</p>
                                <p>{item.municipio}</p>
                                <p>Código postal</p>
                                <p>{item.codigo_postal}</p>
                                <p>Número de Dirección</p>
                                <p>{item.numero_direccion}</p>
                                <p>Información adicional </p>
                                <p>{item.informacion_adicional}</p>

                                <button onClick={() => handleOnDelete(item)}>
                                    Eliminar
                                </button>

                                <button onClick={() => handleOnEdit(item)}>
                                    Editar
                                </button>
                            </div>
                        ))}

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>

                    {address.length === 0 && (
                        <div className="dashboard-empty">
                            <FaMapMarkerAlt size={128} />
                            <p>
                                <strong>
                                    No tienes ninguna dirección de envío
                                    guardada
                                </strong>
                            </p>
                            <small>
                                <FaLock color="#0b8900" />
                                Todos los datos están cifrados
                            </small>
                        </div>
                    )}

                    <button
                        className="orange-button"
                        onClick={() => setShowForm(true)}
                    >
                        <FaMapMarkerAlt size={16} />
                        Agregar nueva dirección
                    </button>
                </section>
            )}

            {showForm && (
                <section className="user-dashboard-container address-container">
                    <h2>Agregar una nueva dirección</h2>

                    <form className="address-form" onSubmit={handleOnSubmit}>
                        <label>
                            <p>País</p>

                            <select
                                name="pais"
                                onChange={handleAddressForm}
                                value={addressForm.pais}
                            >
                                {countries.map(country => (
                                    <option
                                        key={country.nombre}
                                        value={country.nombre}
                                    >
                                        {country.nombre}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            <p>Nombre</p>
                            <input
                                required
                                type="text"
                                maxLength={30}
                                name="nombre"
                                value={addressForm.nombre}
                                onChange={handleAddressForm}
                            />
                        </label>
                        <label>
                            <p>Apellido</p>
                            <input
                                required
                                type="text"
                                maxLength={30}
                                name="apellido"
                                value={addressForm.apellido}
                                onChange={handleAddressForm}
                            />
                        </label>

                        <label htmlFor="telefono">
                            <p>Teléfono</p>
                        </label>

                        <InputPhone
                            required
                            name="telefono"
                            phone={phone}
                            onChangePhone={e => setPhone(e.target.value)}
                            setPrefix={setPrefix}
                            initialPrefix={prefix}
                        />

                        <label>
                            <p>Región/Estado/Provincia</p>
                            <input
                                required
                                type="text"
                                maxLength={30}
                                name="departamento"
                                value={addressForm.departamento}
                                onChange={handleAddressForm}
                            />
                        </label>
                        <label>
                            <p>Localidad/Ciudad</p>
                            <input
                                required
                                type="text"
                                maxLength={30}
                                name="municipio"
                                value={addressForm.municipio}
                                onChange={handleAddressForm}
                            />
                        </label>
                        <label>
                            <p>Código Postal</p>
                            <input
                                required
                                type="text"
                                maxLength={30}
                                name="codigo_postal"
                                value={addressForm.codigo_postal}
                                onChange={handleAddressForm}
                            />
                        </label>
                        <label>
                            <p>Número de Dirección</p>
                            <input
                                required
                                type="text"
                                maxLength={30}
                                name="numero_direccion"
                                value={addressForm.numero_direccion}
                                onChange={handleAddressForm}
                            />
                        </label>
                        <label>
                            <p>Información Adicional / Opciones de entrega</p>
                            <input
                                required
                                type="text"
                                maxLength={50}
                                name="informacion_adicional"
                                value={addressForm.informacion_adicional}
                                onChange={handleAddressForm}
                                placeholder="Ejemplo dejar en la puerta"
                            />
                        </label>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <div className="address-form-buttons">
                            <button onClick={() => setShowForm(false)}>
                                Cancelar
                            </button>

                            <button className="orange-button" type="submit">
                                <FaMapMarkerAlt size={16} />
                                Guardar
                            </button>
                        </div>
                    </form>
                </section>
            )}
        </DashBoard>
    );
};

export default Address;
