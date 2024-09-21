import { IoClose } from 'react-icons/io5';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useRef } from 'react';

import './Modal.css';

const Modal = ({ show, setShow, children, className, setBack }) => {
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
                <div
                    className={`modal-close ${setBack ? 'modal-back' : ''}`}
                    ref={closeRef}
                >
                    {setBack && (
                        <IoChevronBackSharp
                            className="modal-close-icon"
                            size={24}
                            onClick={() => {
                                if (setBack) {
                                    setBack(true);
                                }
                            }}
                        />
                    )}

                    <IoClose
                        size={32}
                        onClick={() => setShow(false)}
                        className="modal-close-icon"
                    />
                </div>

                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
