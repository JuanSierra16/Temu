// src/components/MainContent.jsx
import Slider from '../elements/Slider';
import { categoriesList } from '../../utils/categoriesList';
import './MainContent.css';

const MainContent = () => {
    const firstSubs = categoriesList.map(category => {
        return { name: category.name, sub: category.subcategories[0] };
    });

    return (
        <main>
            <Slider>
                <div className="small-category">
                    {categoriesList.map(category => (
                        <small key={category.name}>{category.name}</small>
                    ))}
                </div>
            </Slider>

            <div>
                <h5>Categorias</h5>

                <Slider>
                    <div className="category-slider">
                        {firstSubs.map(sub => (
                            <div key={sub.name} className="subcategory-slider">
                                <img
                                    src={`/categorias/${sub.name}/${sub.sub}.webp`}
                                    alt=""
                                />

                                <small>{sub.sub}</small>
                            </div>
                        ))}
                    </div>
                </Slider>
            </div>
        </main>
    );
};

export default MainContent;
