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
            <FaAngleLeft
                size={32}
                className="slider-arrow"
                onClick={prevSlide}
            />

            <div className="slider-container" ref={slider}>
                {children}
            </div>

            <FaAngleRight
                size={32}
                className="slider-arrow"
                onClick={nextSlide}
            />
        </section>
    );
};

export default Slider;
