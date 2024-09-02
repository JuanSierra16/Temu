import { FaAngleDown } from 'react-icons/fa';
import './Select.css';
import { useEffect, useRef, Children } from 'react';

const Select = ({ children, onChange }) => {
    const selectedRef = useRef(null);
    const contentRef = useRef(null);
    const selectedItemRef = useRef(null);

    const handleClick = () => {
        selectedRef.current.classList.toggle('active');
        contentRef.current.classList.toggle('active');
    };

    const handleSelect = e => {
        selectedRef.current.classList.remove('active');
        contentRef.current.classList.remove('active');
        selectedItemRef.current.innerHTML = e.target.innerHTML;

        onChange(e.target.innerHTML);
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
        if (selectedItemRef.current) {
            selectedItemRef.current.innerHTML =
                Children.toArray(children)[0].props.children;
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [children]);

    return (
        <div className="select-box">
            <div
                className="select-container"
                ref={selectedRef}
                onClick={handleClick}
            >
                <div className="select-content" ref={selectedRef}>
                    <div className="selected" ref={selectedItemRef}></div>
                </div>

                <FaAngleDown />
            </div>

            <div className="select-dropdown" ref={contentRef}>
                {Children.map(children, child => (
                    <div className="select-item" onClick={handleSelect}>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Select;
