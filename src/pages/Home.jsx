import React from 'react';
import CategoryList from '../components/CategoryList';
import SortList from '../components/SortList';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { useEffect, useState } from 'react';

function Home() {
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности 🠗',
    sortProperty: 'rating',
  });
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62e6600ade23e263792b463f.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ``
      }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
        sortType.sortProperty.includes('-') ? `desc` : `asc`
      }`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, [categoryId, sortType]);

  function onSelectCategory(category) {
    setCategoryId(category);
  }

  function onSelectSortType(sort) {
    setSortType(sort);
  }

  return (
    <div className="container">
      <div className="content__top">
        <CategoryList onSelectCategory={onSelectCategory} activeCategory={categoryId} />
        <SortList onSelectSortType={onSelectSortType} sortType={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((item, i) => <Skeleton key={i} />)
          : items.map((obj) => {
              return isLoading ? <Skeleton /> : <PizzaBlock {...obj} key={obj.id} />;
            })}
      </div>
    </div>
  );
}

export default Home;
