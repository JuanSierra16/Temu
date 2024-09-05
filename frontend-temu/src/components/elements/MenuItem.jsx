import './MenuItem.css';

const MenuItem = ({ children }) => {
    return <div className="menu-item">{children}</div>;
};

const SubMenu = ({ children }) => {
    return <div className="sub-menu">{children}</div>;
};

const SubMenuItem = ({ children }) => {
    return <div className="sub-menu-item">{children}</div>;
};

export { MenuItem, SubMenu, SubMenuItem };
