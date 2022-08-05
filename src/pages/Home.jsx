import React from 'react';
import CategoryList from '../components/CategoryList';
import SortList from '../components/SortList';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';

function Home({ searchWord }) {
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности 🠗',
    sortProperty: 'rating',
  });
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62e6600ade23e263792b463f.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ``
      }${searchWord ? `&search=${searchWord}` : ``}&sortBy=${sortType.sortProperty.replace(
        '-',
        '',
      )}&order=${sortType.sortProperty.includes('-') ? `desc` : `asc`}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchWord, currentPage]);

  function onSelectCategory(category) {
    setCategoryId(category);
  }

  function onSelectSortType(sort) {
    setSortType(sort);
  }

  const pizzas = items
    // .filter((obj) => obj.title.toLowerCase().includes(searchWord.toLowerCase())) Сортировка на стороне js
    .map((obj) => {
      return <PizzaBlock {...obj} key={obj.id} />;
    });

  const skeletons = [...new Array(8)].map((item, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <CategoryList onSelectCategory={onSelectCategory} activeCategory={categoryId} />
        <SortList onSelectSortType={onSelectSortType} sortType={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Home;
