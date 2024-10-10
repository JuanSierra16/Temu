import ScrollToTopButton from '../../components/elements/ScrollToTopButton';
import Footer from '../../components/sections/Footer';
import WhiteBar from '../../components/sections/navbar/WhiteBar';

import returnImg1 from '../../assets/return-policy/return.webp';
import returnImg2 from '../../assets/return-policy/return2.webp';
import returnImg3 from '../../assets/return-policy/return3.webp';

const ReturnPolicy = () => {
    return (
        <>
            <WhiteBar />
            <ScrollToTopButton />

            <article className="max-width privacy-container">
                <h1 className="privacy-tittle">
                    Temu | Política de devolución y reembolso
                </h1>

                <p className="last-update">
                    Última actualización: 28 ago 2024 COT
                </p>

                <p>
                    Si no estás satisfecho con lo que compraste en Temu, es
                    pertinente su devolución y obtener un reembolso siguiendo el
                    procedimiento que se establece en esta Política de
                    devolución y reembolso.
                </p>

                <h2>1. ¿Cómo puedo hacer una devolución?</h2>

                <img src={returnImg1} alt="" />

                <p>Puedes realizar una devolución siguiendo estos pasos:</p>

                <ul>
                    <li>
                        I. Consulta tu cuenta de Temu en Temu.com o en la
                        aplicación para solicitar un reembolso. Si no tienes una
                        cuenta de Temu, haz clic en {`"Guardar tu pedido"`} en
                        el email de tu pedido de Temu para realizar una
                        devolución.
                    </li>
                    <li>
                        II. Encuentra el pedido correspondiente en{' '}
                        {`"Tus pedidos"`}y haz clic en el botón{' '}
                        {`"Devolución/Reembolso"`}.
                    </li>
                    <li>
                        III. Selecciona los artículos que deseas devolver y el
                        motivo de la devolución. Según el motivo seleccionado,
                        es posible que debas proporcionar más información
                        relacionada con el pedido. Después de proporcionar la
                        información necesaria, haz clic en el botón{' '}
                        {`"Siguiente
                        paso"`}{' '}
                        para continuar.
                    </li>
                    <li>
                        IV. Si no es necesario devolver el artículo, el paso
                        final es simplemente seleccionar el método de reembolso.
                        Puedes optar por recibir el reembolso como saldo de
                        crédito Temu o recibir el reembolso en tu método de pago
                        original. Haz tu selección y haz clic en {`"Enviar"`}.
                    </li>
                    <li>
                        V. Puedes comprobar el estado del reembolso de tus
                        artículos en la página de detalles del pedido o a través
                        de las notificaciones por SMS/Email/Notificaciones de
                        Temu.
                    </li>
                </ul>

                <img src={returnImg2} alt="" />

                <p className="orange-text">
                    Asegúrate de que el paquete de devolución esté sellado en un
                    plazo de 14 días después de solicitar la devolución. de lo
                    contrario se dará por terminado el proceso de devolución.
                </p>

                <h2>2. Tarifa de envío de devolución</h2>

                <p>
                    Después de enviar una solicitud de devolución, eres
                    responsable de cubrir los costos de envío de devolución para
                    devolver los artículos tú mismo.
                </p>

                <h2>3. ¿Cuánto tiempo tengo antes de hacer una devolución?</h2>

                <p className="orange-text">
                    Puede devolver artículos en un plazo de 90 días a partir de
                    la fecha de compra, con algunas excepciones:
                </p>

                <p>Artículos que no se pueden devolver:</p>

                <ul>
                    <li>
                        Artículos de ropa que se hayan usado, lavado o dañado
                        después de la entrega, o a los que se les hayan quitado
                        las etiquetas o los stickers de higiene.
                    </li>
                    <li>Productos de alimentación y comestibles.</li>
                    <li>Artículos de salud y cuidado personal.</li>
                    <li>Algunos regalos gratis.</li>
                    <li>Algunos productos personalizados</li>{' '}
                </ul>

                <p>
                    Si un artículo es apto para una devolución y un reembolso,
                    puede devolverlo en el plazo de devolución. Debe devolver el
                    paquete de devolución en un plazo de 14 días a partir del
                    envío de la solicitud de devolución. No puede devolver
                    artículos después de que se haya cerrado el plazo de
                    devolución.
                </p>

                <h2>4. Reembolsos</h2>

                <ul>
                    <li>
                        <li>
                            I. Es posible que recibas un reembolso por
                            adelantado; en esos casos, emitiremos el reembolso
                            después de que hayas entregado tu paquete de
                            devolución. Si no recibimos los artículos devueltos,
                            podemos hacer un cargo a tu método de pago original.
                            El reembolso por adelantado se otorgará según tu
                            historial de compras y a nuestra completa
                            discreción.
                        </li>
                        <li>
                            II. Es posible que recibas un reembolso inmediato,
                            en el que emitiremos el reembolso antes de que hayas
                            devuelto los artículos. Si no recibimos los
                            artículos devueltos, es posible que carguemos el
                            importe a tu método de pago original. El reembolso
                            instantáneo se otorgará según tu historial de
                            compras y a nuestra completa discreción.
                        </li>
                        <li>
                            III. Para los reembolsos de los artículos devueltos,
                            procesaremos tus reembolsos después de que recibamos
                            los artículos y pasen la inspección de calidad.
                        </li>
                        <li>
                            IV. Ten en cuenta que si el artículo devuelto está
                            usado, dañado, le faltan piezas/accesorios o se dañó
                            debido a un empaquetado inadecuado durante el envío
                            de devolución, el reembolso se reducirá para
                            compensar la pérdida de valor del artículo.
                        </li>
                        <li>
                            V. Reembolso de artículos faltantes: busca el pedido
                            correspondiente en el Centro de ayuda y, luego,
                            selecciona {`"artículos o piezas faltantes"`} para
                            solicitar el reembolso o bien comunícate con
                            Atención al Cliente o el operador para obtener
                            asistencia.
                        </li>
                        <li>
                            VI. Reembolsos de un paquete que se muestra como
                            entregado, pero no recibido: busca el pedido
                            correspondiente en el Centro de ayuda y, luego,
                            selecciona{' '}
                            {`"el paquete se muestra como entregado,
                            pero no recibido"`}{' '}
                            para solicitar el reembolso o bien comunícate con
                            Atención al Cliente o el operador para obtener
                            asistencia.
                        </li>
                        <li>
                            VII. Según tu institución financiera, los reembolsos
                            pueden tardar entre 5 y 14 días hábiles (hasta 30
                            días) en abonarse a tu cuenta de pago original.La
                            tarifa de envío original no es reembolsable si la
                            devolución no es el resultado de un error de Temu.
                            Los costos del seguro, si los hubiera, tampoco son
                            reembolsables.
                        </li>
                        <li>
                            VIII. Puedes optar por aceptar crédito Temu en lugar
                            de un reembolso al método de pago original.
                        </li>{' '}
                    </li>
                </ul>

                <ul>
                    <li>
                        Los reembolsos en créditos Temu son más rápidos que el
                        método de pago original.
                    </li>
                    <li>Los créditos Temu no tienen fecha de caducidad.</li>
                    <li>
                        Por lo general, los reembolsos a crédito Temu no pueden
                        anularse una vez procesados.
                    </li>
                    <li>
                        Por lo general, el crédito Temu no se puede canjear por
                        dinero en efectivo y se puede utilizar únicamente para
                        compras en Temu.
                    </li>{' '}
                </ul>

                <h2>5. Plazo de reembolso</h2>

                <p>
                    Una vez que emitimos el reembolso, la entidad financiera
                    tarda más tiempo en hacer que los fondos estén disponibles
                    en tu cuenta. Consulta la siguiente tabla para obtener más
                    detalles.
                </p>

                <img src={returnImg3} alt="" />

                <h2>6. Aviso importante</h2>

                <ul>
                    <li>
                        I. La dirección del remitente en tu paquete NO es la
                        dirección del remitente. Si envías el paquete de
                        devolución a esa dirección, el tiempo de procesamiento
                        de tu devolución puede retrasarse. Solo debe enviar el
                        paquete de devolución a la dirección que figura en la
                        página de detalles de la devolución.
                    </li>
                    <li>
                        II. Asegúrate de NO incluir accidentalmente ningún
                        artículo en tu paquete de devolución que no desees
                        devolver. Si accidentalmente incluiste un artículo
                        incorrecto, comunícate con Atención al cliente. No
                        podemos prometer que se encontrarán y devolverán
                        artículos incorrectos y no almacenamos ni proporcionamos
                        reembolsos por dichos artículos.
                    </li>
                </ul>

                <p>
                    <strong>
                        Si tienes alguna pregunta sobre la realización de una
                        devolución o esta política, comunícate con Atención al
                        Cliente.
                    </strong>
                </p>
            </article>

            <Footer />
        </>
    );
};

export default ReturnPolicy;
