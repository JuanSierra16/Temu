import { Routes } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import FindAccount from './pages/FindAccount';
import Product from './pages/Product';
import BestSellers from './pages/BestSellers';
import FiveStars from './pages/FiveStars';
import NewComers from './pages/NewComers';
import Cart from './pages/Cart';
import SearchProduct from './pages/SearchProduct';
import SetCountry from './pages/SetCountry';

import About from './pages/company-info/About';
import Affiliate from './pages/company-info/Affiliate';
import ContactUs from './pages/company-info/ContactUs';
import JoinUs from './pages/company-info/JoinUs';
import Press from './pages/company-info/Press';
import TreeLanding from './pages/company-info/TreeLanding';

import Partner from './pages/help/Partner';
import TermsOfUse from './pages/help/TermsOfUse';
import PrivacyPolicy from './pages/help/PrivacyPolicy';
import PurchaseSafe from './pages/help/PurchaseSafe';
import SafetyCenter from './pages/help/SafetyCenter';
import SupportQuestions from './pages/help/SupportQuestions';
import ReportCase from './pages/help/ReportCase';

import ScrollToTopRouter from './components/elements/ScrollToTopRouter';
import ReturnPolicy from './pages/customer-service/ReturnPolicy';
import PropertyPolicy from './pages/customer-service/PropertyPolicy';
import ShippingInformation from './pages/customer-service/ShippingInformation';
import PrivacyPreferences from './pages/customer-service/PrivacyPreferences';
import CookiesPolicy from './pages/customer-service/CookiesPolicy';

import YourOrders from './pages/user/YourOrders';
import YourReviews from './pages/user/YourReviews';
import Profile from './pages/user/Profile';
import Coupons from './pages/user/Coupons';
import Address from './pages/user/Address';
import PaymentMethods from './pages/user/PaymentMethods';
import AccountSecurity from './pages/user/AccountSecurity';
import Permissions from './pages/user/Permissions';
import Favorite from './pages/user/Favorite';

import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import CheckoutError from './pages/checkout/CheckoutError';

import SpecialPage from './pages/SpecialPage';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTopRouter />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/find-account" element={<FindAccount />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route
                    path="/search-product/:categoryOrName"
                    element={<SearchProduct />}
                />
                <Route path="/best-sellers" element={<BestSellers />} />
                <Route path="/about" element={<About />} />
                <Route path="/purchase-safe" element={<PurchaseSafe />} />
                <Route path="/safety-center" element={<SafetyCenter />} />
                <Route path="/five-stars" element={<FiveStars />} />
                <Route path="/new-comers" element={<NewComers />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/set-country" element={<SetCountry />} />

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
                <Route path="/report-case" element={<ReportCase />} />

                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/property-policy" element={<PropertyPolicy />} />
                <Route
                    path="/shipping-information"
                    element={<ShippingInformation />}
                />

                <Route
                    path="/privacy-preferences"
                    element={<PrivacyPreferences />}
                />
                <Route path="/cookies-policy" element={<CookiesPolicy />} />

                <Route path="/your-orders" element={<YourOrders />} />
                <Route path="/your-favorite" element={<Favorite />} />
                <Route path="/your-reviews" element={<YourReviews />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/your-addresses" element={<Address />} />
                <Route path="/payment-methods" element={<PaymentMethods />} />
                <Route path="/account-security" element={<AccountSecurity />} />
                <Route path="/permissions" element={<Permissions />} />

                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/checkout/cancel" element={<CheckoutError />} />

                <Route path="/orders/:orderId" element={<YourOrders />} />

                <Route path="/special" element={<SpecialPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
