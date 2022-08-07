import React from 'react';
import CategoryList from '../components/CategoryList';
import SortList from '../components/SortList';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { useEffect, useState, useContext } from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { searchWord } = useContext(SearchContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://62e6600ade23e263792b463f.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ``
        }${searchWord ? `&search=${searchWord}` : ``}&sortBy=${sort.sortProperty.replace(
          '-',
          '',
        )}&order=${sort.sortProperty.includes('-') ? `desc` : `asc`}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  }, [categoryId, sort, searchWord, currentPage]);

  function onSelectCategory(category) {
    dispatch(setCategoryId(category));
  }

  const pizzas = items.map((obj) => {
    return <PizzaBlock {...obj} key={obj.id} />;
  });

  const skeletons = [...new Array(8)].map((item, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <CategoryList onSelectCategory={onSelectCategory} activeCategory={categoryId} />
        <SortList />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Home;
