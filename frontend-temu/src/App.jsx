import MainContent from './components/sections/MainContent';
import Footer from './components/sections/Footer';
import NavBar from './components/sections/navbar/NavBar';
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
