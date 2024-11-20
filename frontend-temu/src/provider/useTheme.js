import { useEffect, useState } from 'react';
import { countryThemes } from '../utils/countryThemes';
import { themes } from '../utils/themes';
import { useCountry } from './UseCountry';

export const useTheme = () => {
    const { country } = useCountry();

    const [theme, setTheme] = useState(() => {
        const loadedTheme = localStorage.getItem('theme');

        if (loadedTheme) {
            return JSON.parse(loadedTheme);
        }

        return themes[0];
    });

    useEffect(() => {
        if (!theme) return;

        localStorage.setItem('theme', JSON.stringify(theme));

        document.documentElement.style.setProperty(
            '--special-color',
            theme.special_color,
        );

        document.documentElement.style.setProperty(
            '--special-color',
            theme.special_color,
        );

        document.documentElement.style.setProperty(
            '--special-color-2',
            theme.special_color2,
        );
    }, [theme]);

    useEffect(() => {
        if (country) {
            const themeName = countryThemes[country.iso3];

            const newTheme =
                themes.find(theme => theme.folder === themeName.theme) ||
                themes[0];

            setTheme(newTheme);
        }
    }, [country]);

    return {
        theme,
    };
};
