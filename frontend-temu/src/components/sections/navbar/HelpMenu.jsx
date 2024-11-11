import './DeskNavBar.css';
import { LuMessageCircle } from 'react-icons/lu';
import { MenuItem, SubMenu } from '../../elements/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useCountry } from '../../../provider/UseCountry';

const HelpMenu = () => {
    const help = [
        { name: 'Centro de ayuda', path: '/support-questions' },
        { name: 'Centro de seguridad', path: '/safety-center' },
        { name: 'Chatea con temu' },
        { name: 'Protección de compras de Temu', path: '/purchase-safe' },
        { name: 'Política de privacidad y cookies', path: '/privacy-policy' },
    ];

    const navigate = useNavigate();
    const { country, currency } = useCountry();

    return (
        <>
            <li>
                <MenuItem>
                    <span className="navbar-hover">
                        <LuMessageCircle size={20} />
                        Ayuda
                    </span>

                    <SubMenu>
                        <div className="help-sub-menu">
                            {help.map(item => (
                                <span key={item.name}>
                                    {item.path && (
                                        <Link to={item.path} target="_blank">
                                            {item.name}
                                        </Link>
                                    )}

                                    {!item.path && <a>{item.name}</a>}
                                </span>
                            ))}
                        </div>
                    </SubMenu>
                </MenuItem>
            </li>

            <li>
                <MenuItem>
                    <span className="navbar-hover">
                        <img
                            src={country.flag ?? ''}
                            alt=""
                            style={{
                                width: '20px',
                                height: '20px',
                            }}
                        />
                        ES
                    </span>

                    <SubMenu>
                        <div className="country-sub-menu">
                            <label htmlFor="country-radio">Idioma</label>

                            <span>
                                <input
                                    name="country-radio"
                                    type="radio"
                                    checked
                                    onChange={() => {}}
                                />
                                <small>Espanol-ES</small>
                            </span>

                            <span>
                                <input
                                    name="country-radio"
                                    type="radio"
                                    checked
                                    onChange={() => {}}
                                />
                                <small>English-EN</small>
                            </span>

                            <hr />

                            <small>Moneda</small>
                            <small>
                                {currency.acronym}: {currency.symbol}
                            </small>

                            <hr />

                            <span>
                                <img src={country.flag ?? ''} alt="" />

                                <small>
                                    Estas comprando en Temu {country.nombre}
                                </small>
                            </span>

                            <button onClick={() => navigate('/set-country')}>
                                Cambiar país/región
                            </button>
                        </div>
                    </SubMenu>
                </MenuItem>
            </li>
        </>
    );
};

export default HelpMenu;
