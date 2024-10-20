import './InputPhone.css';
import { supportPrefixPhone } from '../../utils/prefixPhone';
import Select from './Select';
import { useEffect, useState } from 'react';

const InputPhone = ({
    phone,
    onChangePhone,
    setPrefix,
    disabled = false,
    required = false,
    autoFocus = false,
    name = 'phone',
}) => {
    const [countryValue, setCountryValue] = useState('');

    useEffect(() => {
        // por defecto el primer prefijo de la lista
        const { countryCode, prefix } = supportPrefixPhone[0];
        setCountryValue(`${countryCode} ${prefix}`);
        setPrefix(prefix);
    }, [setPrefix]);

    const handleSelectChange = e => {
        // Obtener el prefijo de número de teléfono seleccionado de la lista
        const { countryCode, prefix } = supportPrefixPhone.find(
            item => item.country == e.target.getAttribute('value'),
        );

        setCountryValue(`${countryCode} ${prefix}`);
        setPrefix(prefix);
    };

    return (
        <div className="phone-input-container">
            <Select value={countryValue}>
                {supportPrefixPhone.map(({ country, prefix }) => (
                    <span
                        className="phone-select"
                        key={country}
                        value={country}
                        onClick={handleSelectChange}
                    >
                        {country} {prefix}
                    </span>
                ))}
            </Select>
            <input
                className="phone-input"
                type="tel"
                name={name}
                required={required}
                autoFocus={autoFocus}
                disabled={disabled}
                value={phone}
                onChange={onChangePhone}
            />
        </div>
    );
};

export default InputPhone;
