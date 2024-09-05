import DeskNavBar from './navbar/DeskNavBar';
import MobileNavBar from './navbar/MobileNavBar';

import './NavBar.css';

const NavBar = () => {
    return (
        <>
            <MobileNavBar />
            <DeskNavBar />
        </>
    );
};

export default NavBar;
