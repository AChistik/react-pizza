import PizzaBlock from './PizzaBlock';
import pizzas from '../assets/pizzas.json';

function MenuList() {
  return (
    <div className="content__items">
      {pizzas
        .sort((a, b) => a.rating - b.rating)
        .map((obj) => {
          return <PizzaBlock {...obj} key={obj.id} />;
        })}
    </div>
  );
}

export default MenuList;
