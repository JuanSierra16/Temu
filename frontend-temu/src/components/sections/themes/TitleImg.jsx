import './Banner.css';
import { useState } from 'react';
import { useTheme } from '../../../provider/useTheme';

const TitleImg = () => {
    const { theme } = useTheme();
    const [erroImg, setErroImg] = useState(false);

    return (
        <>
            {!erroImg && (
                <img
                    src={`/themes/${theme.folder}/title.webp`}
                    alt="Temu"
                    onError={() => setErroImg(true)}
                    className="title-img"
                />
            )}
        </>
    );
};

export default TitleImg;
