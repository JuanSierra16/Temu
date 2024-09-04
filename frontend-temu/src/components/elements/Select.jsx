import { FaAngleDown } from 'react-icons/fa';
import { useEffect, useRef, Children } from 'react';

import './Select.css';

const Select = ({ children, value }) => {
    const selectedRef = useRef(null);
    const contentRef = useRef(null);
    const selectedItemRef = useRef(null);

    const handleClick = () => {
        selectedRef.current.classList.toggle('active');
        contentRef.current.classList.toggle('active');
    };

    const handleSelect = () => {
        selectedRef.current.classList.remove('active');
        contentRef.current.classList.remove('active');
    };

    const handleClickOutside = event => {
        if (
            contentRef.current &&
            !contentRef.current.contains(event.target) &&
            selectedRef.current &&
            !selectedRef.current.contains(event.target)
        ) {
            selectedRef.current.classList.remove('active');
            contentRef.current.classList.remove('active');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        if (selectedItemRef.current && !value) {
            selectedItemRef.current.innerHTML =
                Children.toArray(children)[0].props.children;
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [children, value]);

    return (
        <div className="select-box">
            <div
                className="select-container"
                ref={selectedRef}
                onClick={handleClick}
            >
                <div className="select-content" ref={selectedRef}>
                    <div className="selected">
                        <p>{value}</p>
                    </div>
                </div>

                <FaAngleDown />
            </div>

            <div className="select-dropdown" ref={contentRef}>
                {Children.map(children, child => (
                    <span onClick={handleSelect}>{child}</span>
                ))}
                {/* {children} */}
            </div>
        </div>
    );
};

export default Select;
