import { FaTruckFast } from 'react-icons/fa6';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { IoIosPhonePortrait } from 'react-icons/io';
import { useState } from 'react';

import Modal from '../elements/Modal';
import './BlackBar.css';

const BlackBar = () => {
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);

    return (
        <>
            <section className="bar">
                <div className="max-width flex-row space-around">
                    <article
                        className="flex-row"
                        onClick={() => setShowFirstModal(true)}
                    >
                        <FaTruckFast size={32} />

                        <div className="flex-col align-start">
                            <span>Envío gratis en cada pedido</span>
                            <small>Oferta exclusiva</small>
                        </div>
                    </article>

                    <div className="vertical-line"></div>

                    <article
                        className="flex-row"
                        onClick={() => setShowSecondModal(true)}
                    >
                        <MdOutlineAssignmentReturn size={32} />

                        <div className="flex-col align-start">
                            <span>Devoluciones: 90 días</span>
                            <small>desde la fecha de compra</small>
                        </div>
                    </article>

                    <div className="vertical-line"></div>

                    <article className="flex-row">
                        <IoIosPhonePortrait size={32} />
                        <span>Descarga la app de Temu</span>
                    </article>
                </div>
            </section>

            <Modal show={showFirstModal} setShow={setShowFirstModal}>
                <div className="flex-col">
                    <h3>Envío gratis</h3>
                    <br />

                    <ul className="flex-col align-start">
                        <li>Envío estándar gratis en todos los pedidos.</li>

                        <li>
                            Obtén un crédito de $4.000 (envío estándar) por
                            entrega tardía.
                        </li>

                        <li>
                            Temu tiene requisitos mínimos de envío gratis solo
                            en los pedidos enviados por Temu. Estos requisitos
                            nos permiten ofrecer una gama más amplia de
                            artículos, incluidos tamaños más pequeños y
                            convenientes, así como priorizar métodos de envío
                            más ecológicos. Temu se reserva el derecho de
                            ajustar los requisitos mínimos en eventos o
                            circunstancias específicos. Estos umbrales
                            aplicables se detallan antes de finalizar tu compra.
                        </li>
                    </ul>

                    <br />

                    <button
                        onClick={() => setShowFirstModal(false)}
                        className="orange-button"
                    >
                        Ok
                    </button>
                </div>
            </Modal>

            <Modal show={showSecondModal} setShow={setShowSecondModal}>
                <div className="flex-col">
                    <h3>Especial para ti</h3>
                    <br />

                    <div>
                        <div>Devoluciones: 90 días</div>

                        <details>
                            <summary>Detalles</summary>

                            <p>
                                El plazo de devolución para la mayoría de los
                                artículos es de 90 días. Todos los artículos
                                elegibles pueden devolverse en el plazo de
                                devolución en su estado original para obtener un
                                reembolso completo. Después de enviar una
                                solicitud de devolución, eres responsable de
                                cubrir los costos de envío de devolución para
                                devolver los artículos tú mismo.
                            </p>
                        </details>

                        <details>
                            <summary>Ajuste de precios</summary>

                            <ul>
                                <li>
                                    Los artículos comprados en Temu cumplen los
                                    requisitos de nuestra Política de ajuste de
                                    precios. Temu proporcionará la diferencia de
                                    precio en la moneda en la que se pagó el
                                    pedido si el precio de publicación del
                                    artículo comprado se redujo en un plazo de
                                    30 días después de la compra en el mismo
                                    país o región. El envío de tu pedido no se
                                    verá afectado por la solicitud de un ajuste
                                    de precios antes de recibir el/los
                                    producto(s). Puedes solicitar un reembolso
                                    por ajuste de precios seleccionando el
                                    pedido correspondiente en &quotTus
                                    pedidos&quot y haciendo clic en el botón
                                    &quotAjuste de precios&quot .
                                </li>

                                <li>
                                    Es posible que los artículos que se
                                    encuentran en liquidación, promociones o que
                                    ya no estén disponibles, etc. no sean
                                    elegibles para nuestra política de ajuste de
                                    precios. Las tarifas, incluidas, entre
                                    otras, las tarifas de envío, se excluirán de
                                    cualquier cálculo de ajuste de precios. Temu
                                    se reserva el derecho a la interpretación
                                    final de nuestra Política de ajuste de
                                    precios, el derecho a modificar los términos
                                    de esta política en cualquier momento y el
                                    derecho a denegar cualquier ajuste de
                                    precios a nuestra entera discreción.
                                </li>
                            </ul>
                        </details>
                    </div>

                    <br />

                    <button
                        onClick={() => setShowSecondModal(false)}
                        className="orange-button"
                    >
                        Ok
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default BlackBar;
