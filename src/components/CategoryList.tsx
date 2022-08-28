type CategoryesProps = {
  onSelectCategory: (index: number) => void;
  activeCategory: number;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const CategoryList: React.FC<CategoryesProps> = ({ onSelectCategory, activeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              onClick={() => onSelectCategory(index)}
              key={index}
              className={activeCategory === index ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
