import './ReportCase.css';
import { useContext, useEffect, useState } from 'react';
import BlackBar from '../../components/sections/BlackBar';
import Footer from '../../components/sections/Footer';
import NavBar from '../../components/sections/navbar/NavBar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../provider/UserContext';
import { FaChevronRight } from 'react-icons/fa';
import Modal from '../../components/elements/Modal';

const ReportCase = () => {
    const { userIsLogin, waitLogin } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userIsLogin && !waitLogin) {
            navigate('/');
        }
    }, [userIsLogin, navigate, waitLogin]);

    const [emailModal, setEmailModal] = useState(false);
    const [webModal, setWebModal] = useState(false);
    const [workModal, setWorkModal] = useState(false);

    return (
        <>
            <BlackBar />
            <NavBar />

            <main className="max-width">
                <article className="report-case">
                    <section>
                        <h2>Reportar caso sospechoso</h2>

                        <p>
                            Te prometemos proteger tu privacidad e información.
                            Si detectas alguna actividad sospechosa o tienes
                            alguna preocupación, infórmanos inmediatamente a
                            través de las opciones a continuación. Trataremos tu
                            denuncia con seriedad. ¡Gracias por tu apoyo y
                            cooperación!
                        </p>

                        <p className="orange-text">
                            Si tienes algún informe no sospechoso, como
                            actividades oficiales y pedidos posteriores a la
                            venta, comunícate con Atención al Cliente de Temu.
                        </p>
                    </section>

                    <section>
                        <h4>
                            Selecciona una situación sospechosa que hayas
                            detectado
                        </h4>

                        <div className="report-case-container">
                            <div
                                className="report-case-item"
                                onClick={() => setEmailModal(true)}
                            >
                                <p>
                                    Reportar una llamada telefónica, un email o
                                    un mensaje de SMS/texto sospechoso
                                </p>

                                <FaChevronRight size={16} />
                            </div>

                            <div
                                className="report-case-item"
                                onClick={() => setWebModal(true)}
                            >
                                <p>
                                    Reportar un sitio web falso o aplicación
                                    similar a Temu
                                </p>

                                <FaChevronRight size={16} />
                            </div>

                            <div
                                className="report-case-item"
                                onClick={() => setWorkModal(true)}
                            >
                                <p>
                                    Reportar oportunidades de trabajo falsas y
                                    otras actividades que suplanten a Temu
                                </p>

                                <FaChevronRight size={16} />
                            </div>
                        </div>
                    </section>
                </article>
            </main>

            <Modal show={emailModal} setShow={setEmailModal}>
                <section className="report-case-modal">
                    <h3>Reportar caso sospechoso</h3>

                    <form action="" className="report-case-form">
                        <label>
                            <span>*¿Cómo te contactaron?</span>
                            <select>
                                <option value="">Email</option>
                                <option value="">SMS</option>
                                <option value="">Teléfono</option>
                            </select>
                        </label>

                        <label>
                            <span>*Email o Número de Teléfono</span>
                            <input type="text" />
                        </label>

                        <label>
                            <span>
                                ¿Hubo alguna pérdida de activos? Si la respuesta
                                es sí, completa el monto específico
                            </span>
                            <input
                                type="number"
                                min="0"
                                placeholder="Ejemplo 3000"
                            />
                        </label>

                        <label>
                            <span>
                                *Resume la actividad sospechosa en algunas
                                oraciones
                            </span>
                            <textarea
                                name="resumen"
                                placeholder='Ejemplo: "Me pidieron compartir información personal"'
                            />
                        </label>
                    </form>
                </section>
            </Modal>

            <Modal show={webModal} setShow={setWebModal}>
                <section className="report-case-modal">
                    <h3>Reportar caso sospechoso</h3>

                    <form action="" className="report-case-form">
                        <label>
                            <span>
                                *¿Usaste un sitio web o aplicación falsa?
                            </span>
                            <select>
                                <option value="">Sitio web</option>
                                <option value="">Aplicación</option>
                            </select>
                        </label>

                        <label>
                            <span>
                                *Ingresa el enlace del sitio web o el nombre de
                                la aplicación del que se sospecha
                            </span>
                            <input type="text" />
                        </label>

                        <p>
                            *¿Enviaste alguna información personal? (múltiple)
                        </p>

                        <label className="report-case-checkbox">
                            <input type="checkbox" />
                            <span>
                                Mencioné la información de mi cuenta de Temu.
                            </span>
                        </label>

                        <label className="report-case-checkbox">
                            <input type="checkbox" />
                            <span>Envié la información de mi banco.</span>
                        </label>

                        <label className="report-case-checkbox">
                            <input type="checkbox" />
                            <span>
                                Envié mi email personal, número de teléfono o
                                dirección.
                            </span>
                        </label>

                        <label className="report-case-checkbox">
                            <input type="checkbox" />
                            <span>No envié ninguna información.</span>
                        </label>

                        <label className="report-case-checkbox">
                            <input type="checkbox" />
                            <span>Otro.</span>
                        </label>

                        <label>
                            <span>
                                *Resume la actividad sospechosa en algunas
                                oraciones
                            </span>
                            <textarea
                                name="resumen"
                                placeholder='Ejemplo: "Me pidieron compartir información personal"'
                            />
                        </label>
                    </form>
                </section>
            </Modal>

            <Modal show={workModal} setShow={setWorkModal}>
                <section className="report-case-modal">
                    <h3>Reportar caso sospechoso</h3>

                    <form action="" className="report-case-form">
                        <label>
                            <span>*¿Cómo te contactaron?</span>
                            <select>
                                <option value="">Facebook</option>
                                <option value="">Instagram</option>
                                <option value="">Twitter</option>
                                <option value="">Tiktok</option>
                                <option value="">Youtube</option>
                                <option value="">Pinterest</option>
                                <option value="">Snapchat</option>
                                <option value="">Otros</option>
                            </select>
                        </label>

                        <label>
                            <span>
                                Ingresa el enlace del sitio web o el nombre de
                                la aplicación del que se sospecha
                            </span>
                            <input type="text" />
                        </label>

                        <label>
                            <span>
                                ¿Hubo alguna pérdida de activos? Si la respuesta
                                es sí, completa el monto específico
                            </span>
                            <input
                                type="number"
                                min="0"
                                placeholder="Ejemplo 3000"
                            />
                        </label>

                        <label>
                            <span>
                                *Resume la actividad sospechosa en algunas
                                oraciones
                            </span>
                            <textarea
                                name="resumen"
                                placeholder='Ejemplo: "Me pidieron compartir información personal"'
                            />
                        </label>
                    </form>
                </section>
            </Modal>

            <Footer />
        </>
    );
};

export default ReportCase;
