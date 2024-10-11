import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useContext } from 'react';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { UserContext } from '../../provider/UserContext';
import {
    FaLock,
    FaRegUserCircle,
    FaBluetoothB,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { LuCircleOff } from 'react-icons/lu';
import { CiMicrophoneOn } from 'react-icons/ci';
import { MdOutlineInsertPhoto, MdMonochromePhotos } from 'react-icons/md';
import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Permissions = () => {
    return (
        <DashBoard>
            <section className="user-dashboard-container">
                <div className="account-security-icon">
                    <FaLock size={24} />
                    <h4>Temu NO obtiene tus permisos en el navegador</h4>
                </div>

                <div className="permissions-items">
                    <div className="permissions-item">
                        <div className="permissions-item-header">
                            <span>
                                <FaRegUserCircle size={24} />
                                <p>Contactos</p>
                            </span>

                            <LuCircleOff size={16} className="circle-off" />
                        </div>
                    </div>

                    <div className="permissions-item">
                        <div className="permissions-item-header">
                            <span>
                                <FaBluetoothB size={24} />
                                <p>Bluetooth</p>
                            </span>

                            <LuCircleOff size={16} className="circle-off" />
                        </div>
                    </div>

                    <div className="permissions-item">
                        <div className="permissions-item-header">
                            <span>
                                <CiMicrophoneOn size={24} />
                                <p>Micrófono</p>
                            </span>

                            <LuCircleOff size={16} className="circle-off" />
                        </div>

                        <div className="permissions-item-content">
                            <p>
                                Temu no solicita acceder a tu micrófono en el
                                navegador. A pesar de que el navegador puede
                                solicitar acceso a los permisos de tu micrófono
                                en situaciones como dejar una reseña con video,
                                etc. Temu sólo utilizará los permisos de
                                micrófono que concedas al navegador Chrome para
                                grabar vídeos.
                            </p>
                        </div>
                    </div>

                    <div className="permissions-item">
                        <div className="permissions-item-header">
                            <span>
                                <FaMapMarkerAlt size={24} />
                                <p>Ubicación</p>
                            </span>

                            <LuCircleOff size={16} className="circle-off" />
                        </div>

                        <div className="permissions-item-content">
                            <p>
                                En la mayoría de los países/regiones, como
                                Colombia, EE. UU., Reino Unido, etc., Temu no
                                solicita acceso a tu ubicación en el navegador.
                                Solo para usuarios de Medio Oriente, el
                                navegador puede solicitar acceso a sus permisos
                                de ubicación. Temu solo utilizará los permisos
                                de ubicación que le otorgues al navegador
                                Chrome, para que a los usuarios les resulte más
                                fácil completar con precisión su dirección de
                                envío.
                            </p>
                        </div>
                    </div>

                    <div className="permissions-item">
                        <div className="permissions-item-header">
                            <span>
                                <MdOutlineInsertPhoto size={24} />
                                <p>Fotos</p>
                            </span>

                            <LuCircleOff size={16} className="circle-off" />
                        </div>

                        <div className="permissions-item-content">
                            <p>
                                Temu no solicita acceso a tus fotos en el
                                navegador. Aunque el navegador puede solicitar
                                permisos de acceso a tus fotos en situaciones
                                como dejar una reseña, buscar artículos, etc.,
                                Temu solo utilizará los permisos de fotos que le
                                otorgues al navegador Chrome para cargar
                                imágenes.
                            </p>
                        </div>
                    </div>

                    <div className="permissions-item">
                        <div className="permissions-item-header">
                            <span>
                                <MdMonochromePhotos size={24} />
                                <p>Cámara</p>
                            </span>

                            <LuCircleOff size={16} className="circle-off" />
                        </div>

                        <div className="permissions-item-content">
                            <p>
                                Temu no solicita permiso para acceder a tu
                                cámara en el navegador. Incluso cuando usamos la
                                cámara para dejar una reseña, buscar artículos,
                                etc., Temu solo usará los permisos de cámara que
                                le otorgues al navegador Chrome para tomar
                                fotografías.
                            </p>
                        </div>
                    </div>

                    <div className="permissions-item">
                        <div className="permissions-item-header">
                            <span>
                                <IoIosMore size={24} />
                                <p>Otros</p>
                            </span>

                            <LuCircleOff size={16} className="circle-off" />
                        </div>

                        <div className="permissions-item-content">
                            <p>
                                Además de las funciones del dispositivo
                                anteriores, Temu no solicitará acceso a ninguna
                                otra función del dispositivo, como tu
                                calendario, recordatorios, etc.
                            </p>
                        </div>
                    </div>
                </div>

                <small>
                    Temu considera que la transparencia es primordial y solicita
                    una cantidad mínima de permisos. Puedes obtener más
                    información sobre cómo operamos para proteger la privacidad
                    de nuestros usuarios en la{' '}
                    <Link to="/privacy-policy">Política de privacidad</Link>,
                    que incluye detalles sobre cómo manejamos la información que
                    no requiere solicitar permiso o acerca de la privacidad
                    personal.
                </small>
            </section>
        </DashBoard>
    );
};

export default Permissions;
