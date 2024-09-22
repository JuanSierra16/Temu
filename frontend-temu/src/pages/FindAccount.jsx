import './FindAccount.css';
import { FaUserCircle, FaChevronRight } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { UserContext } from '../provider/UserContext';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';
import Modal from '../components/elements/Modal';
import InputPhone from '../components/elements/InputPhone';

const FindAccount = () => {
    const [findByEmailModal, setFindByEmailModal] = useState(false);
    const [findByPhoneModal, setFindByPhoneModal] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [prefix, setPrefix] = useState('');
    const [success, setSuccess] = useState(false);
    const [findData, setFindData] = useState({
        username: null,
        email: null,
        phone_number: null,
        message: null,
    });

    const { findAccountWithEmail, findAccountWithPhoneNumber, loginError } =
        useContext(UserContext);

    const findAccountEmail = () => {
        findAccountWithEmail(email).then(data => {
            if (data.username) {
                setFindData(data);
                setFindByEmailModal(false);
                setSuccess(true);
            }
        });
    };

    const findAccountPhone = () => {
        findAccountWithPhoneNumber(`${prefix}${phone}`).then(data => {
            if (data.username) {
                setFindData(data);
                setFindByPhoneModal(false);
                setSuccess(true);
            }
        });
    };

    return (
        <main>
            <NavBar />

            <article className="max-width find-account">
                {!success && (
                    <>
                        <h2>Elige una forma de encontrar tu cuenta</h2>

                        <p>
                            Puedes elegir una de las siguientes maneras de
                            encontrar tu cuenta:
                        </p>

                        <div className="find-account-grid">
                            <div
                                className="find-account-item"
                                onClick={() => setFindByEmailModal(true)}
                            >
                                <div>
                                    <p>
                                        Proporciona una dirección de email para
                                        encontrar la cuenta
                                    </p>

                                    <small>
                                        Puede encontrar una cuenta que coincida
                                        de manera similar por email
                                    </small>
                                </div>

                                <FaChevronRight />
                            </div>

                            <div
                                className="find-account-item"
                                onClick={() => setFindByPhoneModal(true)}
                            >
                                <p>
                                    Proporciona un número de teléfono para
                                    encontrar la cuenta
                                </p>
                                <FaChevronRight />
                            </div>

                            <div className="find-account-item">
                                <p>
                                    Proporciona el ID del pedido para encontrar
                                    la cuenta
                                </p>
                                <FaChevronRight />
                            </div>
                        </div>
                    </>
                )}

                {success && (
                    <>
                        <h2>
                            Hemos encontrado una cuenta que coincide con lo que
                            has introducido.
                        </h2>

                        <div className="find-account-item">
                            <div className="find-account-user">
                                <FaUserCircle size={48} />

                                <div>
                                    <p>{findData.username}</p>
                                    <small>{findData.email}</small>
                                    {findData.phone_number && (
                                        <small>{findData.phone_number}</small>
                                    )}
                                </div>
                            </div>

                            <FaChevronRight />
                        </div>
                    </>
                )}
            </article>

            <Modal show={findByEmailModal} setShow={setFindByEmailModal}>
                <div className="find-account-modal">
                    <h5>
                        Proporciona una dirección de email para buscar el pedido
                    </h5>

                    <p>
                        Ingresa tu email para encontrar una cuenta que coincida
                        total o parcialmente con lo que ingresaste.
                    </p>

                    <label htmlFor="email">
                        Dirección de email
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>

                    <button
                        className="orange-button"
                        onClick={findAccountEmail}
                    >
                        Encontrar cuenta
                    </button>

                    {findData.message && <small>{findData.message}</small>}
                    {loginError && <small>{loginError}</small>}
                </div>
            </Modal>

            <Modal show={findByPhoneModal} setShow={setFindByPhoneModal}>
                <div className="find-account-modal">
                    <h5>
                        Proporciona un número de teléfono para buscar la cuenta
                    </h5>

                    <p>
                        Ingresa el número de teléfono asociado con tu cuenta
                        Temu para encontrar tu cuenta.
                    </p>

                    <label htmlFor="phone">Número de teléfono</label>
                    <InputPhone
                        onChangePhone={e => setPhone(e.target.value)}
                        phone={phone}
                        setPrefix={setPrefix}
                        required
                        autoFocus
                    />

                    <button
                        className="orange-button"
                        onClick={findAccountPhone}
                    >
                        Encontrar cuenta
                    </button>

                    {findData.message && <small>{findData.message}</small>}
                    {loginError && <small>{loginError}</small>}
                </div>
            </Modal>

            <Footer />
        </main>
    );
};

export default FindAccount;
