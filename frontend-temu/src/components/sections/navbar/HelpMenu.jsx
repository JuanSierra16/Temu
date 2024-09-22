import { LuMessageCircle } from 'react-icons/lu';
import { MenuItem, SubMenu } from '../../elements/MenuItem';

import './DeskNavBar.css';

const HelpMenu = () => {
    const help = [
        { name: 'Centro de ayuda', path: '#' },
        { name: 'Centro de seguridad', path: '#' },
        { name: 'Chatea con temu', path: '#' },
        { name: 'Protección de compras de Temu', path: '#' },
        { name: 'Política de privacidad y cookies', path: '#' },
    ];

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
                                <a href={item.path} key={item.name}>
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </SubMenu>
                </MenuItem>
            </li>

            <li>
                <MenuItem>
                    <span className="navbar-hover">
                        <img
                            src="/colombia-icon.png"
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
                            <small>Cop: $</small>

                            <hr />

                            <span>
                                <img src="/colombia-icon.png" alt="" />

                                <small>Estas comprando en Temu Colombia</small>
                            </span>

                            <button>Cambiar país/región</button>
                        </div>
                    </SubMenu>
                </MenuItem>
            </li>
        </>
    );
};

export default HelpMenu;
