// src/components/MainContent.jsx
import Slider from '../elements/Slider';
import { categoriesList } from '../../utils/categoriesList';
import Compromise from './Compromise';
import './MainContent.css';

const MainContent = () => {
    const firstSubs = categoriesList
        .map(category => {
            return { name: category.name, sub: category.subcategories[0] };
        })
        .reverse();

    return (
        <main className="main-content">
            <div className="small-category-container">
                <Slider>
                    <div className="small-category">
                        {categoriesList.map(category => (
                            <small key={category.name}>{category.name}</small>
                        ))}
                    </div>
                </Slider>
            </div>

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

            <div className="categories-slider">
                <h6 className="max-width">Categorias</h6>

                <Slider>
                    <div className="category-slider">
                        {firstSubs.map(sub => (
                            <div key={sub.name} className="subcategory-slider">
                                <img
                                    src={`/categorias/${sub.name}/${sub.sub}.webp`}
                                    alt=""
                                />

                                <small>{sub.name}</small>
                            </div>
                        ))}
                    </div>
                </Slider>
            </div>
        </main>
    );
};

export default MainContent;
