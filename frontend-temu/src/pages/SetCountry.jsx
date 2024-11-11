import './SetCountry.css';
import Select from '../components/elements/Select';
import BlackBar from '../components/sections/BlackBar';
import Footer from '../components/sections/Footer';
import NavBar from '../components/sections/navbar/NavBar';
import { countries as supportedCountries } from '../utils/countriesList';
import { useCountries } from 'use-react-countries';
import { useCountry } from '../provider/UseCountry';
import { SUPPORT_CURRENCIES } from '../utils/SupportCurrencies';

const SetCountry = () => {
    const { countries } = useCountries();
    const { country, setCountryByIso3, setCurrencyByCode, currency } =
        useCountry();

    return (
        <>
            <BlackBar />
            <NavBar />

            <main className="set-country">
                <h2>Selecciona el país de donde compras</h2>

                <Select value={country.nombre}>
                    {supportedCountries.map(country => (
                        <span
                            key={country.iso2}
                            value={country.nombre}
                            onClick={() => setCountryByIso3(country.iso3)}
                            className="country-item"
                        >
                            <img
                                src={
                                    countries.find(c => c.name === country.name)
                                        ?.flags.png
                                }
                                alt=""
                            />
                            <span>{country.nombre}</span>
                        </span>
                    ))}
                </Select>

                <small>
                    Si cambias el país o la región desde la que compras, la
                    disponibilidad de artículos, los precios, los gastos de
                    envío y los impuestos pueden cambiar (incluidos los
                    artículos de tu carrito).
                </small>

                <select
                    name="currency"
                    onChange={e => setCurrencyByCode(e.target.value)}
                    defaultValue={currency.acronym}
                >
                    {SUPPORT_CURRENCIES.map(currency => (
                        <option key={currency}>{currency}</option>
                    ))}
                </select>

                <p>
                    {currency.acronym}
                    {currency.factor}
                </p>
            </main>

            <Footer />
        </>
    );
};

export default SetCountry;
