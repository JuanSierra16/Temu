// src/components/MainContent.jsx
import Slider from '../elements/Slider';
import { categoriesList } from '../../utils/categoriesList';
import Compromise from './Compromise';

import { products } from '../../utils/products';
import './MainContent.css';
import ProductPrev from '../elements/ProductPrev';

const MainContent = () => {
    const firstSubs = categoriesList
        .map(category => {
            return { name: category.name, sub: category.subcategories[0] };
        })
        .reverse();

    return (
        <main>
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

export default MainContent;
