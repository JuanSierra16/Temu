import { FaTruckFast } from 'react-icons/fa6';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { RiQrScan2Line, RiSmartphoneLine } from 'react-icons/ri';
import { FaApple } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { CiGift } from 'react-icons/ci';

import { useState } from 'react';

import Modal from '../elements/Modal';
import './BlackBar.css';

const BlackBar = () => {
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [showThirdModal, setShowThirdModal] = useState(false);

    return (
        <>
            <section className="bar">
                <div className="max-width bar-container">
                    <article
                        className="bar-article"
                        onClick={() => setShowFirstModal(true)}
                    >
                        <FaTruckFast size={28} />

                        <div className="col-start">
                            <span>Envío gratis en cada pedido</span>
                            <small>Oferta exclusiva</small>
                        </div>
                    </article>

                    <div className="vertical-line"></div>

                    <article
                        className="bar-article"
                        onClick={() => setShowSecondModal(true)}
                    >
                        <MdOutlineAssignmentReturn size={28} />

                        <div className="col-start">
                            <span>Devoluciones: 90 días</span>
                            <small>desde la fecha de compra</small>
                        </div>
                    </article>

                    <div className="vertical-line"></div>

                    <article
                        className="bar-article"
                        onClick={() => setShowThirdModal(true)}
                    >
                        <RiSmartphoneLine size={32} />
                        <span>Descarga la app de Temu</span>
                    </article>
                </div>
            </section>

            <Modal show={showFirstModal} setShow={setShowFirstModal}>
                <div className="bar-modal">
                    <h3>Envío gratis</h3>

                    <ul>
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

                    <button
                        onClick={() => setShowFirstModal(false)}
                        className="orange-button"
                    >
                        Ok
                    </button>
                </div>
            </Modal>

            <Modal show={showSecondModal} setShow={setShowSecondModal}>
                <div className="bar-modal">
                    <h3>Especial para ti</h3>

                    <div className="bar-details">
                        <details>
                            <summary>Devoluciones: 90 días</summary>

                            <ul>
                                <li>
                                    El plazo de devolución para la mayoría de
                                    los artículos es de 90 días. Todos los
                                    artículos elegibles pueden devolverse en el
                                    plazo de devolución en su estado original
                                    para obtener un reembolso completo.
                                </li>

                                <li>
                                    Después de enviar una solicitud de
                                    devolución, eres responsable de cubrir los
                                    costos de envío de devolución para devolver
                                    los artículos tú mismo.
                                </li>
                            </ul>
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

                    <button
                        onClick={() => setShowSecondModal(false)}
                        className="orange-button"
                    >
                        Ok
                    </button>
                </div>
            </Modal>

            <Modal show={showThirdModal} setShow={setShowThirdModal}>
                <div className="bar-modal">
                    <h3>Descarga la app de Temu para disfrutar</h3>

                    <div className="bar-modal-icons">
                        <div className="bar-modal-icon">
                            <FaTruckFast size={32} />
                            <p>Estado del pedido</p>
                        </div>

                        <div className="bar-modal-icon">
                            <FiMessageCircle size={32} />
                            <p>Atención al cliente</p>
                        </div>

                        <div className="bar-modal-icon">
                            <CiGift size={32} />
                            <p>Eventos únicos de la aplicación</p>
                        </div>
                    </div>

                    <div className="bar-modal-qr">
                        <div>
                            <img src="/temu-qr.png" alt="" />

                            <p>
                                <RiQrScan2Line />
                                Escanea el código QR con la cámara de tu
                                teléfono
                            </p>
                        </div>

                        <div>
                            <button>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.einnovation.temu&hl=es&gl=co&referrer=adg_reftag%3Dafb7bf7be9b68b87e7d299f64eac28c8%26ads_channel%3Dgoogle%26ads_sub_channel%3Dsearch%26ads_account%3D1204871858%26ads_set%3D21104778154%26ads_id%3D161509618962%26ads_creative_id%3D693748223408%26ns_source%3Dg%26ns_keyword%3Dtemu%26ns_match_type%3De%26gclid%3DEAIaIQobChMI6cqLo-iuiAMVLaxaBR0HEgfMEAAYASAAEgIcOPD_BwE%26wbraid%3DCj8KCQjwreW2BhCRARIuAEiZJEBLvg2vD8bWGmalxjcoiziu-jAEapZJ_jzf63owbalug-SJtXILT8cKWRoCzKo%26gbraid%3D0AAAAAo4mICGep8aI9r4nY51cNbOusoTVK%26vst_type%3Dadg"
                                    target="_blank"
                                >
                                    <img src="/google-play-icon.png" alt="" />

                                    <span>
                                        <p>
                                            <small>Descargar en</small>
                                        </p>
                                        <p>
                                            <strong>Google Play</strong>
                                        </p>
                                    </span>
                                </a>
                            </button>

                            <button>
                                <a
                                    href="https://apps.apple.com/co/app/temu-compra-como-millonario/id1641486558"
                                    target="_blank"
                                >
                                    <FaApple size={32} />

                                    <span>
                                        <p>
                                            <small>Descargar en</small>
                                        </p>
                                        <p>
                                            <strong>App Store</strong>
                                        </p>
                                    </span>
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default BlackBar;
