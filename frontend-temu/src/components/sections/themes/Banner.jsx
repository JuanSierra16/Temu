import './Banner.css';
import { useState } from 'react';
import { useTheme } from '../../../provider/useTheme';

const Banner = () => {
    const { theme } = useTheme();
    const [errorBanner, setErrorBanner] = useState(false);
    const [errorBackground, setErrorBackground] = useState(false);

    const onErrorBanner = () => setErrorBanner(true);
    const onErrorBackground = () => setErrorBackground(true);

    return (
        <div className="banner-container">
            {!errorBackground && (
                <img
                    src={`/themes/${theme.folder}/back.webp`}
                    alt="Background de temporada temu"
                    onError={onErrorBackground}
                    className="banner-background"
                />
            )}

            {!errorBanner && (
                <img
                    src={`/themes/${theme.folder}/banner.webp`}
                    alt="Banner de temporada temu"
                    onError={onErrorBanner}
                    className={`banner-img ${errorBackground ? '' : 'max-width'}`}
                />
            )}
        </div>
    );
};

export default Banner;
