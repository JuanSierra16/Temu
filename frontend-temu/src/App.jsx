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
                <Route path="/" element={<Home />}>
                    <Route index element={<Home />} />
                </Route>

                <Route path="/terms-of-use" element={<TermsOfUse />}>
                    <Route index element={<TermsOfUse />} />
                </Route>

                <Route path="/privacy-policy" element={<PrivacyPolicy />}>
                    <Route index element={<PrivacyPolicy />} />
                </Route>

                <Route path="/find-account" element={<FindAccount />}>
                    <Route index element={<FindAccount />} />
                </Route>

                <Route path="/product" element={<Product />}>
                    <Route index element={<Product />} />
                </Route>

                <Route path="/about" element={<About />}>
                    <Route index element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
