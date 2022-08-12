import { useRef, useEffect, useState, useContext } from 'react';
import CategoryList from '../components/CategoryList';
import SortList from '../components/SortList';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setFiltres } from '../redux/slices/filterSlice';
import { setItems } from '../redux/slices/pizzasSlice';
import { useNavigate } from 'react-router-dom';
import { categotyList } from '../components/SortList';
import { SearchContext } from '../App';
import qs from 'qs';

function Home() {
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const items = useSelector((state) => state.pizzas.items);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const { searchWord } = useContext(SearchContext);

  const fetchPizzas = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchWord ? `&search=${searchWord}` : ``;
    const sortBy = sort.sortProperty.replace('-', '');
    const sortOrder = sort.sortProperty.includes('-') ? `desc` : `asc`;
    try {
      const { data } = await axios.get(
        `https://62e6600ade23e263792b463f.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${sortOrder}`,
      );
      dispatch(setItems(data));
    } catch (error) {
      alert('Ошибка при получении пицц');
      console.log('ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = categotyList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFiltres({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;

    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
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
      <Pagination currentPage={currentPage} />
    </div>
  );
}

export default Home;
