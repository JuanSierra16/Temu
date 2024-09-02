// src/components/LoginModal.jsx
import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { login } from '../API/Login.API';
import Select from './Select';

import { FaXTwitter, FaTruckFast } from 'react-icons/fa6';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

import './Login.css';

const supportPrefixPhone = [
    {
        country: 'Australia',
        countryCode: 'AU',
        prefix: '+61',
    },
    {
        country: 'Brasil',
        countryCode: 'BR',
        prefix: '+55',
    },
    {
        country: 'Brunéi Darusalam',
        countryCode: 'BN',
        prefix: '+673',
    },
    {
        country: 'Canada',
        countryCode: 'CA',
        prefix: '+1',
    },
    {
        country: 'Chile',
        countryCode: 'CL',
        prefix: '+56',
    },
    {
        country: 'Colombia',
        countryCode: 'CO',
        prefix: '+57',
    },
    {
        country: 'Corea del Sur',
        countryCode: 'KR',
        prefix: '+82',
    },
    {
        country: 'Ecuador',
        countryCode: 'EC',
        prefix: '+593',
    },
    {
        country: 'El Salvador',
        countryCode: 'SV',
        prefix: '+503',
    },
    {
        country: 'Estados Unidos',
        countryCode: 'US',
        prefix: '+1',
    },
    {
        country: 'Filipinas',
        countryCode: 'PH',
        prefix: '+63',
    },
    {
        country: 'Japón',
        countryCode: 'JP',
        prefix: '+81',
    },
    {
        country: 'Malasia',
        countryCode: 'MY',
        prefix: '+60',
    },
    {
        country: 'Mexico',
        countryCode: 'MX',
        prefix: '+52',
    },
    {
        country: 'Nueva Zelanda',
        countryCode: 'NZ',
        prefix: '+64',
    },
    {
        country: 'Panamá',
        countryCode: 'PA',
        prefix: '+507',
    },
    {
        country: 'Perú',
        countryCode: 'PE',
        prefix: '+51',
    },
    {
        country: 'República Dominicana',
        countryCode: 'DO',
        prefix: '+1',
    },
    {
        country: 'Tailandia',
        countryCode: 'TH',
        prefix: '+66',
    },
    {
        country: 'Trinidad y Tobago',
        countryCode: 'TT',
        prefix: '+1868',
    },
    {
        country: 'Uruguay',
        countryCode: 'UY',
        prefix: '+598',
    },
];

const Login = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [show, setShow] = useState(true);

    const [countryValue, setCountryValue] = useState('');

    useState(() => {
        const { countryCode, prefix } = supportPrefixPhone[0];
        setCountryValue(`${countryCode} ${prefix}`);
    }, []);

    const handleEmail = event => {
        const newInputValue = event.target.value;

        if (/^\d+$/.test(newInputValue)) {
            setIsPhoneNumber(true);
            setPhone(newInputValue);
            setEmail('');
        } else {
            setEmail(newInputValue);
        }
    };

    const handlePhone = event => {
        const newInputValue = event.target.value;
        setPhone(newInputValue);

        if (/^\d+$/.test(newInputValue) === false) {
            setIsPhoneNumber(false);
            setPhone('');
            setEmail(newInputValue);
        }
    };

    const handleSelectChange = e => {
        const { countryCode, prefix } = supportPrefixPhone.find(
            item => item.country == e.target.getAttribute('value'),
        );

        setCountryValue(`${countryCode} ${prefix}`);
    };

    return (
        <div style={{ backgroundColor: 'red' }}>
            <dialog open={show}>
                <div className="close-button"></div>

                <h3>Inicias sesión/Registrarse</h3>

                <div className="flex-row green">
                    <FaLock />
                    <p>Todos los datos se cifrarán</p>
                </div>

                <div className="flex-row space-around">
                    <div className="flex-col">
                        <FaTruckFast size={42} className="icon" />
                        <p>
                            <strong>Envío gratis</strong>
                        </p>
                        <small>En todos los pedidos</small>
                    </div>

                    <div className="flex-col">
                        <MdOutlineAssignmentReturn size={42} className="icon" />
                        <p>
                            <strong>Devoluciones: 90 días</strong>
                        </p>
                        <small>Desde la fecha de compra</small>
                    </div>
                </div>

                <form action="">
                    <label htmlFor="emailPhone">
                        Email o número de teléfono
                    </label>

                    {isPhoneNumber && (
                        <div className={`phone-input`}>
                            <Select
                                onChange={handleSelectChange}
                                value={countryValue}
                            >
                                {supportPrefixPhone.map(
                                    ({ country, prefix }) => (
                                        <span key={country} value={country}>
                                            {country} {prefix}
                                        </span>
                                    ),
                                )}
                            </Select>

                            <input
                                type="tel"
                                value={phone}
                                onChange={handlePhone}
                                required
                                autoFocus
                            />
                        </div>
                    )}

                    {!isPhoneNumber && (
                        <input
                            name="emailPhone"
                            type="email"
                            value={email}
                            required
                            autoFocus
                            onChange={handleEmail}
                        />
                    )}

                    <button type="submit" className="orange-button">
                        Continuar
                    </button>

                    <a href="#">¿Tienes problemas para iniciar sesión?</a>

                    <div className="flex-col login-with">
                        <div className="flex-row">
                            <hr />
                            <p>O continúa de otras maneras</p>
                            <hr />
                        </div>

                        <div className="flex-row">
                            <FaGoogle size={32} />
                            <FaFacebook size={32} />
                            <FaApple size={32} />
                            <FaXTwitter size={32} />
                        </div>
                    </div>
                </form>

                <p className="terms">
                    Al continuar, aceptas nuestros{' '}
                    <a href="#">Términos de uso</a> y{' '}
                    <a href="#">Política de privacidad.</a>
                </p>
            </dialog>
        </div>
    );
};

export default Login;
