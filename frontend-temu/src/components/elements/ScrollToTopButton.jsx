import { CiSquareChevUp } from 'react-icons/ci';

const ScrollToTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button onClick={scrollToTop} style={buttonStyle}>
            <CiSquareChevUp size={30} />
        </button>
    );
};

const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    zIndex: 1000,
};

export default ScrollToTopButton;
