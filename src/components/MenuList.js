import PizzaBlock from './PizzaBlock';
import Skeleton from './PizzaBlock/Skeleton';
import { useEffect, useState } from 'react';

function MenuList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://62e6600ade23e263792b463f.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => setItems(json));
  }, []);

  return items.length <= 0 ? (
    <Skeleton />
  ) : (
    <div className="content__items">
      {items
        .sort((a, b) => a.rating - b.rating)
        .map((obj) => {
          return <PizzaBlock {...obj} key={obj.id} />;
        })}
    </div>
  );
}

export default MenuList;
