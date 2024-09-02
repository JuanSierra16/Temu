import { FaTruckFast } from 'react-icons/fa6';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { IoIosPhonePortrait } from 'react-icons/io';

import './BlackBar.css';

const BlackBar = () => {
    return (
        <section className="bar flex-row space-around">
            <article className="flex-row">
                <FaTruckFast size={32} />

                <div className="flex-col align-start">
                    <span>Envío gratis en cada pedido</span>
                    <small>Oferta exclusiva</small>
                </div>
            </article>

            <div className="vertical-line"></div>

            <article className="flex-row">
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
        </section>
    );
};

export default BlackBar;
