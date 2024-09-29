import { Routes } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import TermsOfUse from './pages/TermsofUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FindAccount from './pages/FindAccount';
import Product from './pages/Product';
import About from './pages/About';
import ScrollToTopRouter from './components/elements/ScrollToTopRouter';
import BestSellers from './pages/BestSellers';
import PurchaseSafe from './pages/help/PurchaseSafe';
import SafetyCenter from './pages/help/SafetyCenter';
import FiveStars from './pages/FiveStars';
import NewCommers from './pages/NewCommers';
import SupportQuestions from './pages/help/SupportQuestions';

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
                <Route path="/best-sellers" element={<BestSellers />} />
                <Route path="/about" element={<About />} />
                <Route path="/purchase-safe" element={<PurchaseSafe />} />
                <Route path="/safety-center" element={<SafetyCenter />} />
                <Route path="/five-stars" element={<FiveStars />} />
                <Route path="/new-commers" element={<NewCommers />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/support-questions"
                    element={<SupportQuestions />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
