import WhiteBar from '../../components/sections/navbar/WhiteBar';
import ScrollToTopButton from '../../components/elements/ScrollToTopButton';
import Footer from '../../components/sections/Footer';

const ShippingInformation = () => {
    return (
        <>
            <WhiteBar />
            <ScrollToTopButton />

            <article className="max-width privacy-container">
                <h1 className="privacy-tittle">Temu | Información de envío</h1>

                <p className="last-update">
                    Última actualización: 7 de enero de 2024
                </p>

                <h2>
                    Ofrecemos ENVÍO ESTÁNDAR GRATIS en casi todos los pedidos.
                </h2>

                <h2>Opciones de envío</h2>

                <p>
                    Puedes elegir envío estándar según los artículos de tu
                    pedido y tu ubicación. Debido a que tus pedidos pueden ser
                    entregados a repartidores locales para el tramo final de la
                    entrega, es posible que el seguimiento no esté disponible en
                    cada paso del recorrido.
                </p>

                <h2>Dirección de envío</h2>

                <p>
                    Asegúrate de haber proporcionado la dirección correcta y
                    actual para el envío y la entrega. Puedes utilizar casillas
                    de correo como tu dirección de envío. Sin embargo, ciertos
                    artículos solo se pueden entregar a direcciones físicas. Los
                    productos grandes, los objetos de valor, los productos
                    perecederos, los productos con restricciones según la edad o
                    los artículos enviados a través de transportistas privados
                    pueden requerir una dirección de correo física o una
                    confirmación de firma para que sean entregados
                    correctamente. Los socios comerciales también pueden indicar
                    en las publicaciones de productos que no pueden enviar
                    productos a casillas de correo. Los artículos no pueden
                    entregarse a áreas restringidas de seguridad como bases
                    militares.
                </p>

                <h2>Tiempo y costo de envío</h2>

                <p>
                    Después de que un pedido se haya pagado y confirmado
                    correctamente, verás el tiempo de entrega estimado y el
                    costo de envío en la página de confirmación del pedido.
                    También recibirás un mensaje de confirmación de pedido que
                    indicará el tiempo de procesamiento estimado para tu pedido.
                </p>

                <p>
                    El almacén puede tardar entre 1 a 3 días en procesar tu
                    pedido. Recibirás un mensaje una vez que se haya enviado tu
                    pedido.
                </p>

                <p>
                    Recibirás un mensaje de notificación de envío que te
                    proporcionará el tiempo de entrega estimado para cada
                    paquete una vez que se haya enviado. También te
                    proporcionaremos el número de seguimiento cuando esté listo.
                    Puedes ver este tiempo de entrega estimado en cada paquete
                    en tu historial de pedidos al mismo tiempo.
                </p>

                <p>
                    En la mayoría de los casos, tu pedido se entregará dentro
                    del tiempo estimado de entrega. Sin embargo, la fecha real
                    de entrega puede verse afectada por las reservas de vuelo,
                    las condiciones climáticas y otros factores externos.
                    Consulta la información de seguimiento para obtener la fecha
                    de entrega más actualizada.
                </p>

                <h2>Problemas relacionados con la entrega</h2>

                <p>
                    Si tu paquete no se ha entregado o tu información de
                    seguimiento muestra que tu paquete se ha entregado, pero no
                    lo has recibido, comunícate con nuestra atención al cliente
                    de inmediato y en un plazo de 90 días posteriores a la fecha
                    del pedido.
                </p>
            </article>

            <Footer />
        </>
    );
};

export default ShippingInformation;
