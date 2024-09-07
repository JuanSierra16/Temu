import { useEffect, useState } from 'react';

import { categoriesList } from '../../../utils/categoriesList';
import './CategoryView.css';

const CategoryView = ({ categoryName }) => {
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const find = categoriesList.find(
            category => category.name === categoryName,
        );

        setCategory(find);
    }, [categoryName]);

    return (
        <section className="category-view">
            {category?.subcategories.map(subcategory => (
                <div key={subcategory} className="subcategory">
                    <img
                        src={`/categorias/${category.name}/${subcategory}.webp`}
                        alt=""
                    />

                    <small>{subcategory}</small>
                </div>
            ))}
        </section>
    );
};

export default CategoryView;
