import './UserDashboard.css';
import DashBoard from '../../layouts/DashBoard';
import { useState } from 'react';
import { FaBox } from 'react-icons/fa';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);

    return (
        <DashBoard>
            <section className="user-dashboard-container">
                {suppliers.length === 0 && (
                    <div className="dashboard-empty">
                        <FaBox size={128} />
                        <p>
                            <strong>No tienes ningún proveedor seguido</strong>
                        </p>
                        <p>
                            Obtendrá mejores recomendaciones a medida que siga a
                            más proveedores.
                        </p>
                    </div>
                )}
            </section>
        </DashBoard>
    );
};

export default Suppliers;
