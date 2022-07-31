import { useState } from 'react';

function CategoryList() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onCategoryClick = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              onClick={() => onCategoryClick(index)}
              key={index}
              className={activeCategory === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryList;
