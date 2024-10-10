import './SupportQuestions.css';
import BlackBar from '../../components/sections/BlackBar';
import NavBar from '../../components/sections/navbar/NavBar';
import Footer from '../../components/sections/Footer';
import { FaAngleRight } from 'react-icons/fa';

const SupportQuestions = () => {
    const supportQuestions = [
        {
            title: 'Cargos desconocidos',
            content: (
                <p>
                    Cuando realiza un pedido, Temu se comunica con el banco
                    emisor para confirmar la validez del método de pago. Tu
                    banco reserva los fondos hasta que se procese la transacción
                    o caduque la autorización. Esta reserva aparece
                    inmediatamente en tu estado de cuenta, pero no es un cargo
                    real. Si cancelas tu pedido, la autorización se elimina de
                    tu cuenta de acuerdo con las políticas de tu banco. Ponte en
                    contacto con tu banco para aclarar cuánto tiempo tienen para
                    poner autorizaciones en espera para pedidos en línea.
                </p>
            ),
        },
        {
            title: 'Denuncia algo sospechoso',
            content: (
                <p>
                    En Temu, la seguridad de los datos y las transacciones de
                    nuestros clientes es fundamental. Estamos dedicados a
                    proporcionar una experiencia de compra en línea segura y a
                    proteger tu privacidad e información personal. Si encuentras
                    alguna actividad sospechosa o tienes inquietudes sobre tu
                    privacidad o seguridad en Temu, te pedimos que lo reportes
                    de inmediato.
                </p>
            ),
        },
        {
            title: 'Cómo devolver o intercambiar un artículo en Temu',
            content: (
                <div className="support-item-content">
                    <p>
                        Lamentablemente, no ofrecemos intercambios en este
                        momento, pero puedes hacer un nuevo pedido y comenzar
                        una devolución del pedido actual. Casi todos los
                        artículos son aptos para devoluciones y reembolsos en un
                        plazo de 90 días a partir de la fecha de compra. Las
                        pocas excepciones son:
                    </p>

                    <ul className="support-item-content">
                        <li>
                            - Prendas de vestir que hayan sido usadas, lavadas,
                            dañadas o a las que se les hayan quitado las
                            etiquetas, el embalaje o las pegatinas de higiene, o
                            que formen parte de un juego incompleto.
                        </li>
                        <li>
                            - Artículos etiquetados específicamente como no
                            retornables.
                        </li>
                        <li>- Artículos personalizados. - Algunos regalos.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: 'Mi información de seguimiento dice que mi paquete ya fue entregado, pero no lo he recibido.',
            content: (
                <p>
                    No te preocupes, si no has recibido tu paquete, hay algunas
                    cosas que podemos hacer: 1. Verifica tu dirección de envío.
                    Ve a la página Tus pedidos en Temu.com o a la aplicación
                    Temu para confirmar los detalles de envío de tu pedido. 2.
                    Si se confirma la dirección, generalmente se descubre que la
                    mayoría de los paquetes se extravían accidentalmente. Mira
                    alrededor de tu buzón o lugar de entrega para ver si el
                    servicio de transporte dejó tu paquete cerca de tu casa, en
                    tu buzón de correo, frente a tu garaje o en tu césped. 3.
                    Verifica si alguien más aceptó el paquete en tu nombre. Pide
                    a tu familia, vecinos u otros miembros del hogar que vean si
                    aceptaron la entrega por ti. 4. A veces, un paquete se marca
                    como entregado cuando el servicio de postal llegue a tu
                    dirección, pero no puede realizar la entrega porque no logra
                    comunicarse contigo. Revisa los mensajes y emails de tu
                    teléfono para ver si el operador te notificó un intento
                    fallido de entrega. Si hubo un intento fallido de entrega o
                    aún no puedes recuperar tu paquete, lo mejor es comunicarte
                    directamente con el repartidor. Ten a mano tu número de
                    seguimiento y consulta los números debajo para llamar a tu
                    operador para obtener más información.
                </p>
            ),
        },
        {
            title: '¿Cómo puedo enviar mis artículos de regreso?',
            content: (
                <div className="support-item-content">
                    <p>
                        Si tus artículos son elegibles para una devolución,
                        puedes seguir los pasos que se indican abajo para
                        iniciar el proceso de devolución:
                    </p>

                    <ul className="support-item-content">
                        <li>1. Inicia sesión en tu cuenta.</li>
                        <li>
                            2. Encuentra el pedido correspondiente en Tus
                            pedidos y haz clic en Devolver/Reembolsar.
                        </li>
                        <li>
                            3. Confirma que recibiste el paquete y selecciona
                            los artículos que deseas devolver y el motivo de la
                            devolución. Si lo requirieses, también puedes cargar
                            fotos o comentarios para explicar más a fondo.
                        </li>
                        <li>
                            4. Confirma la información de devolución y haz clic
                            en Siguiente.
                        </li>
                        <li>
                            5. i no es necesario devolver el artículo, el paso
                            final es simplemente seleccionar el método de
                            reembolso. Puedes optar por recibir tu reembolso
                            como saldo de crédito de Temu o crédito a tu método
                            de pago original. Haz tu selección y haz clic en
                            Enviar.
                        </li>
                        <li>
                            6. Todos los artículos calificados se pueden
                            devolver en su estado original en un plazo de 90
                            días posteriores a la compra para obtener un
                            reembolso completo.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: '¿Qué debo hacer si me faltan artículos de mi pedido?',
            content: (
                <p>
                    En el caso de los pedidos con sobrepeso, puede que dividamos
                    el pedido y enviarlo en varios paquetes para que puedas
                    recibir los demás artículos de tu pedido lo antes posible.
                    Enviaremos los productos restantes tan pronto como se
                    procesen. Puedes ver los detalles de tu pedido en la página
                    Tus pedidos de tu cuenta Temu. Haz clic en rastrear junto a
                    tu pedido para ver si tus artículos se dividieron en varios
                    paquetes.
                </p>
            ),
        },
        {
            title: '¿Por qué no puedo encontrar mi pedido en mi cuenta?',
            content: (
                <div className="support-item-content">
                    <p>
                        Lamentamos saber que no puedas encontrar tu pedido.
                        Puedes elegir las siguientes maneras de encontrar tus
                        pedidos.
                    </p>

                    <ul className="support-item-content">
                        <li>1. Proporciona el ID para buscar el pedido</li>

                        <li>
                            2. Proporciona un número de teléfono para buscar el
                            pedido
                        </li>

                        <li>
                            3. Proporcione una dirección de correo electrónico
                            para encontrar el pedido
                        </li>

                        <li>
                            4. Proporciona la información de pago para buscar el
                            pedido
                        </li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <main>
            <BlackBar />
            <NavBar />

            <article className="support-questions">
                <header>
                    <div className="max-width">
                        <h1>Hola, ¿cómo podemos ayudarte?</h1>

                        <p>
                            Selecciona un pedido para obtener ayuda con
                            problemas de artículos, envíos, devoluciones,
                            reembolsos, etc.
                        </p>
                    </div>
                </header>

                <section className="max-width support-container">
                    <h2>Temas recomendados</h2>

                    <div className="support-items">
                        {supportQuestions.map((question, index) => (
                            <details key={index} className="support-item">
                                <summary className="support-summary">
                                    <p>{question.title}</p>
                                    <FaAngleRight size={24} />
                                </summary>

                                <div className="support-item-content">
                                    {question.content}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            </article>

            <Footer />
        </main>
    );
};

export default SupportQuestions;
