import { LuMessageCircle } from 'react-icons/lu';
import React from 'react';
import { MenuItem, SubMenu } from '../elements/MenuItem';
import './WhiteBar.css';



const WhiteBar = () => {

    const help = [
        { name: 'Centro de ayuda', path: '#' },
        { name: 'Centro de seguridad', path: '#' },
        { name: 'Chatea con temu', path: '#' },
        { name: 'Protección de compras de Temu', path: '#' },
        { name: 'Política de privacidad y cookies', path: '#' },
    ];

    return (

        <nav className="whitebar">
            <div className="whitebar-container max-width">
                <img src="/TemuLogo.png" alt="logo" className="logo" />
                <ul className="">
                    <li>
                        <MenuItem>
                            <span className="whitebar-hover">
                                <LuMessageCircle size={30} />
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
                            <span className="whitebar-hover">
                                <img
                                    src="/colombia-icon.png"
                                    alt=""
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                    }}
                                />
                                ES
                            </span>

                            <SubMenu>
                                <div className="country-sub-menu">
                                    <label htmlFor="country-radio">
                                        Idioma
                                    </label>

                                    <span>
                                        <input
                                            name="country-radio"
                                            type="radio"
                                            checked
                                            onChange={() => {}}
                                        />
                                        <small>Espanol-ES</small>
                                    </span>

                                    <hr />

                                        <small>Moneda</small>
                                        <small>Cop: $</small>

                                    <hr />

                                    <span>
                                        <img src="/colombia-icon.png" alt="" />

                                        <small>
                                            Estas comprando en Temu Colombia
                                        </small>
                                    </span>
                                </div>
                            </SubMenu>
                        </MenuItem>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default WhiteBar;