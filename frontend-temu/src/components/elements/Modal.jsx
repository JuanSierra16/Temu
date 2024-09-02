import './Modal.css';

const Modal = ({ show, setShow, children }) => {
    return (
        <div className={`modal ${show ? 'open' : ''}`}>
            <div className="modal-container">
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
