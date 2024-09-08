import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import './Slider.css';
import { useRef } from 'react';

const Slider = ({ children }) => {
    const slider = useRef();

    const nextSlide = () => {
        slider.current.scrollLeft += slider.current.offsetWidth;
    };

    const prevSlide = () => {
        slider.current.scrollLeft -= slider.current.offsetWidth;
    };

    return (
        <section className="max-width slider">
            <div className="slider-arrow" onClick={prevSlide}>
                <FaAngleLeft size={24} />
            </div>

            <div className="slider-container" ref={slider}>
                {children}
            </div>

            <div className="slider-arrow" onClick={nextSlide}>
                <FaAngleRight size={24} />
            </div>
        </section>
    );
};

export default Slider;
