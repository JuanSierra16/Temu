import { Routes } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import FindAccount from './pages/FindAccount';
import Product from './pages/Product';
import BestSellers from './pages/BestSellers';
import FiveStars from './pages/FiveStars';
import NewCommers from './pages/NewCommers';
import Cart from './pages/Cart';

import About from './pages/company-info/About';
import Affiliate from './pages/company-info/Affiliate';
import ContactUs from './pages/company-info/ContactUs';
import JoinUs from './pages/company-info/JoinUs';
import Press from './pages/company-info/Press';
import TreeLanding from './pages/company-info/TreeLanding';

import Partner from './pages/help/Partner';
import TermsOfUse from './pages/help/TermsofUse';
import PrivacyPolicy from './pages/help/PrivacyPolicy';
import PurchaseSafe from './pages/help/PurchaseSafe';
import SafetyCenter from './pages/help/SafetyCenter';
import SupportQuestions from './pages/help/SupportQuestions';

import ScrollToTopRouter from './components/elements/ScrollToTopRouter';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTopRouter />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/find-account" element={<FindAccount />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/best-sellers" element={<BestSellers />} />
                <Route path="/five-stars" element={<FiveStars />} />
                <Route path="/new-commers" element={<NewCommers />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="/about" element={<About />} />
                <Route path="/affiliate" element={<Affiliate />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/join-us" element={<JoinUs />} />
                <Route path="/press" element={<Press />} />
                <Route path="/tree-landing" element={<TreeLanding />} />

                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route
                    path="/support-questions"
                    element={<SupportQuestions />}
                />
                <Route path="/safety-center" element={<SafetyCenter />} />
                <Route path="/purchase-safe" element={<PurchaseSafe />} />
                <Route path="/partner-with-temu" element={<Partner />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
