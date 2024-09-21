import { FaChevronRight } from 'react-icons/fa';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';

import './FindAccount.css';

const FindAccount = () => {
    return (
        <main>
            <NavBar />

            <article className="max-width find-account">
                <h2>Elige una forma de encontrar tu cuenta</h2>

                <p>
                    Puedes elegir una de las siguientes maneras de encontrar tu
                    cuenta:
                </p>

                <div className="find-account-grid">
                    <div className="find-account-item">
                        <div>
                            <p>
                                Proporciona una dirección de email para
                                encontrar la cuenta
                            </p>

                            <small>
                                Puede encontrar una cuenta que coincida de
                                manera similar por email
                            </small>
                        </div>

                        <FaChevronRight />
                    </div>

                    <div className="find-account-item">
                        <p>
                            Proporciona un número de teléfono para encontrar la
                            cuenta
                        </p>
                        <FaChevronRight />
                    </div>

                    <div className="find-account-item">
                        <p>
                            Proporciona el ID del pedido para encontrar la
                            cuenta
                        </p>
                        <FaChevronRight />
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
};

export default FindAccount;
