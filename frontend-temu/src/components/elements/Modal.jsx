import './Modal.css';

const Modal = ({ show, setShow, children, className }) => {
    return (
        <div className={`modal ${show ? 'open' : ''}`}>
            <div className={`modal-container ${className}`}>
                <div
                    className="modal-close"
                    onClick={() => setShow(false)}
                ></div>

                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
