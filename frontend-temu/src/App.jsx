import { Routes } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import TermsOfUse from './pages/TermsofUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FindAccount from './pages/FindAccount';
import Product from './pages/Product';
import About from './pages/About';
import ScrollToTopRouter from './components/elements/ScrollToTopRouter';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTopRouter />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/find-account" element={<FindAccount />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
