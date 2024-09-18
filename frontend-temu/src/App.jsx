import MainContent from './components/sections/MainContent';
import Footer from './components/sections/Footer';
import NavBar from './components/sections/navbar/NavBar';
import BlackBar from './components/sections/BlackBar';
import TermsofUse from './components/sections/TermsofUse';
import PrivacyPolicy from './components/sections/PrivacyPolicy';
import { Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/terms-of-use' element={<TermsofUse />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/' element={
                    <>
                        <BlackBar />
                        <NavBar />
                        <MainContent />
                        <Footer />
                    </>
                } />
            </Routes>    
        </Router>
    );
}

export default App;
