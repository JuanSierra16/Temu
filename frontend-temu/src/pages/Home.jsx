import './Home.css';
import Slider from '../components/elements/Slider';
import { categoriesList } from '../utils/categoriesList';
import Compromise from '../components/sections/Compromise';
import FlashDeals from '../components/sections/FlashDeals';
import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';
import ProductGrid from '../components/sections/ProductGrid';
import CartPanel from '../components/sections/CartPanel';
import { Link } from 'react-router-dom';
import Banner from '../components/sections/themes/Banner';
import TitleImg from '../components/sections/themes/TitleIMG';

const Home = () => {
    const firstSubs = categoriesList
        .map(category => {
            return { name: category.name, sub: category.subcategories[0] };
        })
        .reverse();

    return (
        <>
            <BlackBar />
            <NavBar />

            <main>
                <section className="small-category-container">
                    <Slider>
                        <div className="small-category">
                            {categoriesList.map(category => (
                                <small key={category.name}>
                                    {category.name}
                                </small>
                            ))}
                        </div>
                    </Slider>
                </section>

                <article className="main-content">
                    <header className="main-header">
                        <Banner />
                    </header>

                    <Compromise />
                    <FlashDeals />

                    <section className="categories-slider">
                        <div className="max-width">
                            <div className="img-title">
                                <TitleImg />
                                <h2 className="max-width">Categorias</h2>
                            </div>
                        </div>

                        <Slider>
                            <div className="category-slider">
                                {firstSubs.map(sub => (
                                    <Link
                                        key={sub.name}
                                        className="subcategory-slider"
                                        to={`/search-product/${encodeURIComponent(
                                            sub.name,
                                        )}`}
                                    >
                                        <img
                                            src={`/categorias/${sub.name}/${sub.sub}.webp`}
                                            alt=""
                                        />

                                        <small>{sub.name}</small>
                                    </Link>
                                ))}
                            </div>
                        </Slider>
                    </section>

                    <section className="categories-slider">
                        <div className="max-width">
                            <div className="img-title">
                                <TitleImg />
                                <h2>PROVEEDORES RECOMENDADOS</h2>
                            </div>
                        </div>
                    </section>

                    <ProductGrid />
                </article>
            </main>

            <CartPanel />
            <Footer />
        </>
    );
};

export default Home;
