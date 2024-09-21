import { Link } from 'react-router-dom';
import HelpMenu from './HelpMenu';

import './WhiteBar.css';

const WhiteBar = () => {
    return (
        <nav className="whitebar">
            <div className="whitebar-container max-width">
                <Link to="/">
                    <img src="/TemuLogo.png" alt="logo" className="logo" />
                </Link>

                <ul>
                    <HelpMenu />
                </ul>
            </div>
        </nav>
    );
};

export default WhiteBar;
