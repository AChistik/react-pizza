import PizzaBlock from './PizzaBlock';
import Skeleton from './PizzaBlock/Skeleton';
import { useEffect, useState } from 'react';

function MenuList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://62e6600ade23e263792b463f.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="content__items">
      {isLoading
        ? [...new Array(8)].map((item, i) => <Skeleton key={i} />)
        : items
            .sort((a, b) => a.rating - b.rating)
            .map((obj) => {
              return isLoading ? <Skeleton /> : <PizzaBlock {...obj} key={obj.id} />;
            })}
    </div>
  );
}

export default MenuList;
