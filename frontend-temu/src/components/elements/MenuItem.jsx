import './MenuItem.css';

const MenuItem = ({ children }) => {
    function checkOverflow(element) {
        // validamos si el elemento tiene esta por fuera de la pantalla
        // agregamos clases para evitar que se rompa el menu (Cmabio del ancho de la pantalla)
        const rect = element.getBoundingClientRect();
        const isOverflowingLeft = rect.x < 0;
        const isOverflowingRight = rect.x + rect.width > window.innerWidth - 20;

        if (isOverflowingLeft) {
            element.classList.add('sub-menu-overflowing-left');
        }

        if (isOverflowingRight) {
            element.classList.add('sub-menu-overflowing-right');
        }

        return isOverflowingLeft || isOverflowingRight;
    }

    const handleMouseOver = () => {
        const submenu = document.querySelectorAll('.sub-menu');
        submenu.forEach(submenu => {
            checkOverflow(submenu);
        });
    };

    return (
        <div className="menu-item" onMouseOver={handleMouseOver}>
            {children}
        </div>
    );
};

const SubMenu = ({ children }) => {
    return <div className="sub-menu">{children}</div>;
};

export { MenuItem, SubMenu };
