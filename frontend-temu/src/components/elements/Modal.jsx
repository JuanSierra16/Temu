import { IoClose } from 'react-icons/io5';

import './Modal.css';
import { useRef } from 'react';

const Modal = ({ show, setShow, children, className }) => {
    const modalRef = useRef(null);
    const closeRef = useRef(null);

    const handleAddScrollClass = () => {
        if (modalRef.current.scrollTop > 20) {
            closeRef.current.classList.add('modal-close-scroll');
        } else {
            closeRef.current.classList.remove('modal-close-scroll');
        }
    };

    return (
        <div className={`modal ${show ? 'open' : ''}`}>
            <div
                className={`modal-container ${className}`}
                onScroll={handleAddScrollClass}
                ref={modalRef}
            >
                <div className="modal-close" ref={closeRef}>
                    <IoClose size={32} onClick={() => setShow(false)} />
                </div>

                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
