import './Home.css';
import Slider from '../components/elements/Slider';
import { categoriesList } from '../utils/categoriesList';
import Compromise from '../components/sections/Compromise';
import { products } from '../utils/products';
import ProductPrev from '../components/elements/ProductPrev';
import FlashDeals from '../components/sections/FlashDeals';
import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';
import Footer from '../components/sections/Footer';

const Home = () => {
    const firstSubs = categoriesList
        .map(category => {
            return { name: category.name, sub: category.subcategories[0] };
        })
        .reverse();

    return (
        <main>
            <BlackBar />
            <NavBar />

            <section className="small-category-container">
                <Slider>
                    <div className="small-category">
                        {categoriesList.map(category => (
                            <small key={category.name}>{category.name}</small>
                        ))}
                    </div>
                </Slider>
            </section>

            <article className="main-content">
                <section className="main-header">
                    <div className="banner-background">
                        <div className="max-width banner-container">
                            <img
                                src="/themes/Amor y Amistad/banner.png"
                                alt=""
                                className="banner"
                            />
                        </div>
                    </div>

                    <Compromise />
                    <FlashDeals />
                </section>

                <section className="categories-slider">
                    <div className="max-width">
                        <div className="img-title">
                            <img
                                src="/themes/Amor y Amistad/title.png"
                                alt=""
                            />
                            <h2 className="max-width">Categorias</h2>
                        </div>
                    </div>

                    <Slider>
                        <div className="category-slider">
                            {firstSubs.map(sub => (
                                <div
                                    key={sub.name}
                                    className="subcategory-slider"
                                >
                                    <img
                                        src={`/categorias/${sub.name}/${sub.sub}.webp`}
                                        alt=""
                                    />

                                    <small>{sub.name}</small>
                                </div>
                            ))}
                        </div>
                    </Slider>
                </section>

                <section className="categories-slider">
                    <div className="max-width">
                        <div className="img-title">
                            <img
                                src="/themes/Amor y Amistad/title.png"
                                alt=""
                            />
                            <h2>PROVEEDORES RECOMENDADOS</h2>
                        </div>
                    </div>

                    <Slider>
                        <div className="product-slider">
                            {products.map(product => (
                                <span key={product.title}>
                                    <ProductPrev product={product} />
                                </span>
                            ))}
                        </div>
                    </Slider>
                </section>
            </article>

            <Footer />
        </main>
    );
};

export default Home;
