import MainContent from './components/widgets/MainContent';
import Footer from './components/sections/Footer';
import NavBar from './components/sections/NavBar';
import BlackBar from './components/sections/BlackBar';

function App() {
    return (
        <>
            <BlackBar />
            <NavBar />
            <MainContent />
            <Footer />
        </>
    );
}

export default App;
