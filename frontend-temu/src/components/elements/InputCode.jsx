import './InputCode.css';

const InputCode = ({ setCode, disabled = false }) => {
    return (
        <div className="input-code-container">
            <label htmlFor="phoneCode">Código de verificación</label>

            <input
                type="text"
                maxLength={6}
                disabled={disabled}
                onChange={e => setCode(e.target.value)}
            />
        </div>
    );
};

export default InputCode;
