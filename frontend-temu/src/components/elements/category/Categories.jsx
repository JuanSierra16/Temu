import { useEffect, useState } from 'react';
import { categoriesList } from '../../../utils/categoriesList';
import CategoryView from './CategoryView';
import './Categories.css';

const Categories = () => {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        setCategoryName(categoriesList[0].name);
    }, []);

    return (
        <article className="categories">
            <h3>Categorias</h3>

            <section className="categories-list-container">
                <div className="categories-list">
                    {categoriesList.map(category => (
                        <p
                            key={category.name}
                            onClick={() => setCategoryName(category.name)}
                            className={`category ${categoryName === category.name ? 'category-active' : ''}`}
                        >
                            {category.name}
                        </p>
                    ))}
                </div>

                <CategoryView categoryName={categoryName} />
            </section>
        </article>
    );
};

export default Categories;
