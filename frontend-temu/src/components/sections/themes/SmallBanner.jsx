import './Banner.css';
import { FaAngleRight } from 'react-icons/fa';
import { useTheme } from '../../../provider/useTheme';
import { useState } from 'react';

const SmallBanner = () => {
    const { theme } = useTheme();
    const [errorBanner, setErrorBanner] = useState(false);

    return (
        <div className="small-banner">
            {!errorBanner && (
                <img
                    src={`/themes/${theme.folder}/small-banner.webp`}
                    alt="Banner de temporada temu"
                    onError={() => setErrorBanner(true)}
                    className="small-banner-img"
                ></img>
            )}

            <div className="flash-deals-header">
                <h2>⚡ Ofertas relámpago ⚡</h2>

                <div className="flash-deals-link">
                    <p>Por tiempo limitado</p>
                    <FaAngleRight />
                </div>
            </div>
        </div>
    );
};

export default SmallBanner;
