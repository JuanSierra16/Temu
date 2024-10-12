import { useEffect, useState } from 'react';
import { categoriesList } from '../../../utils/categoriesList';
import { useNavigate } from 'react-router-dom';

const CategoryView = ({ categoryName }) => {
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const find = categoriesList.find(
            category => category.name === categoryName,
        );

        setCategory(find);
    }, [categoryName]);

    const handleClick = subcategory => {
        navigate(`/search-product/${encodeURIComponent(subcategory)}`);
    };

    return (
        <section className="category-view">
            {category?.subcategories.map(subcategory => (
                <div
                    key={subcategory}
                    className="subcategory"
                    onClick={() => handleClick(subcategory)}
                >
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
