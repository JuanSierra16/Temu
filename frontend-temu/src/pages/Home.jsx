// src/components/MainContent.jsx
import Slider from '../components/elements/Slider';
import { categoriesList } from '../utils/categoriesList';
import Compromise from '../components/sections/Compromise';

import { products } from '../utils/products';
import './Home.css';
import ProductPrev from '../components/elements/ProductPrev';
import FlashDeals from '../components/sections/FlashDeals';
import BlackBar from '../components/sections/BlackBar';
import NavBar from '../components/sections/navbar/NavBar';

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

            <article className="main-content">
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

                <section className="banner-background">
                    <div className="max-width banner-container">
                        <img
                            src="/themes/Amor y Amistad/banner.png"
                            alt=""
                            className="banner"
                        />
                    </div>
                </section>

                <Compromise />

                <FlashDeals />

                <section className="categories-slider">
                    <h5 className="max-width main-content-title">Categorias</h5>

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

                <div className="max-width">
                    <div className="img-title">
                        <img src="/themes/Amor y Amistad/title.png" alt="" />
                        <h2>Explora Tus Intereses</h2>
                    </div>
                </div>

                <section className="max-width categories-products">
                    {products.map(product => (
                        <span key={product.title}>
                            <ProductPrev product={product} />
                        </span>
                    ))}
                </section>
            </article>
        </main>
    );
};

export default Home;
