// src/App.jsx
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import BlackBar from './components/BlackBar';
import Login from './components/Login';

function App() {
    return (
        <div>
            <BlackBar />
            <NavBar />
            <Login />
            <MainContent />
            <Footer />
        </div>
    );
}

export default App;
