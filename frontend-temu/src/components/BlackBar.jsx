import React from 'react';
import './BlackBar.css'; // Asegúrate de crear y aplicar este archivo CSS
import { FaTruckFast } from "react-icons/fa6";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";

const BlackBar = () => {
    return (
        <div className="BlackBar">
            <div className="BlackBar__item">
                <span>Envío gratis en cada pedido</span>
                <small>Oferta exclusiva</small>
                <FaTruckFast />
            </div>
            <div className="BlackBar__item">
                <span>Devoluciones: 90 días</span>
                <small>desde la fecha de compra</small>
                <MdOutlineAssignmentReturn />
            </div>
            <div className="BlackBar__item">
                <span>Descarga la app de Temu</span>{/* Probando 123 */}
                <IoIosPhonePortrait />
            </div>
        </div>
    );
};

export default BlackBar;