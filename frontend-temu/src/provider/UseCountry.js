import { useEffect, useState } from 'react';
import { countries as supportedCountries } from '../utils/countriesList';
import { useCountries } from 'use-react-countries';
import { SUPPORT_CURRENCIES } from '../utils/SupportCurrencies';

export const useCountry = () => {
    const { countries } = useCountries();

    const [country, setCountry] = useState(() => {
        const loadedCountry = localStorage.getItem('country');

        if (loadedCountry) {
            return JSON.parse(loadedCountry);
        }

        const countryIso = supportedCountries.find(
            country => country.iso3 === 'COL',
        );

        const countryOptions = countries.find(c => c.name === countryIso.name);

        return {
            ...countryIso,
            flag: countryOptions?.flags.png,
        };
    });

    const [currency, setCurrency] = useState(() => {
        const loadedCurrency = localStorage.getItem('currency');

        if (loadedCurrency) {
            return JSON.parse(loadedCurrency);
        }

        const currencyIso = SUPPORT_CURRENCIES.find(
            currency => currency.acronym === 'EUR',
        );

        return {
            ...currencyIso,
            exchangeRate: 1, // factor en base al EURO
        };
    });

    const [fetchingCurrencies, setFetchingCurrencies] = useState(false);

    useEffect(() => {
        if (country) {
            localStorage.setItem('country', JSON.stringify(country));
        }
    }, [country]);

    useEffect(() => {
        if (currency) {
            localStorage.setItem('currency', JSON.stringify(currency));
        }
    }, [currency]);

    const setCountryByIso3 = iso3 => {
        const newCountry = supportedCountries.find(c => c.iso3 === iso3);

        if (newCountry) {
            const countryOptions = countries.find(
                c => c.name === newCountry.name,
            );

            setCountry({
                ...newCountry,
                flag: countryOptions?.flags.png,
                currency: country.currency || SUPPORT_CURRENCIES[0],
            });
        }
    };

    const setCurrencyByCode = currency => {
        if (SUPPORT_CURRENCIES.find(c => c.acronym === currency)) {
            setFetchingCurrencies(true);

            const currencyUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`;

            fetch(currencyUrl)
                .then(res => res.json())
                .then(data => {
                    const newCurrency = SUPPORT_CURRENCIES.find(
                        c => c.acronym === currency,
                    );

                    setCurrency({
                        ...newCurrency,
                        exchangeRate: data['eur'][currency.toLowerCase()],
                    });
                })
                .catch(error => {
                    console.error(error);

                    const newCurrency = SUPPORT_CURRENCIES.find(
                        c => c.acronym === 'EUR',
                    );

                    setCurrency({
                        ...newCurrency,
                        exchangeRate: 1,
                    });
                })
                .finally(() => {
                    setFetchingCurrencies(false);
                });
        }
    };

    return {
        country,
        setCountryByIso3,
        currency,
        setCurrencyByCode,
        fetchingCurrencies,
    };
};
