import { useRef, useEffect, useCallback } from 'react';
import CategoryList from '../components/CategoryList';
import SortList from '../components/SortList';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { setCategoryId, setFiltres } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { useNavigate } from 'react-router-dom';
import { categotyList } from '../components/SortList';
import qs from 'qs';
import { RootState, useAppDispatch } from '../redux/store';
import { FilterSliceState } from '../redux/slices/filterSlice';

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const { items, status } = useSelector((state: RootState) => state.pizzas);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;
    const sortBy = sort.sortProperty.replace('-', '');
    const sortOrder = sort.sortProperty.includes('-') ? `desc` : `asc`;

    dispatch(
      fetchPizzas({
        category,
        search,
        sortBy,
        sortOrder,
        currentPage: String(currentPage),
      }),
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FilterSliceState;

      const sort = categotyList.find((obj) => obj.sortProperty === params.sort.sortProperty);
      dispatch(
        setFiltres({
          ...params,
          sort: sort || categotyList[0],
        }),
      );

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
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
  }, [categoryId, sort, searchValue, currentPage]);

  const onSelectCategory = useCallback((category: number) => {
    dispatch(setCategoryId(category));
  }, []);
  const pizzas = items.map((obj: any) => {
    return <PizzaBlock {...obj} key={obj.id} />;
  });

  const skeletons = [...new Array(4)].map((item, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <CategoryList onSelectCategory={onSelectCategory} activeCategory={categoryId} />
        <SortList />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error__info">
          <h2>
            Возникла ошибка <i>😕</i>
          </h2>
          <p>
            Вероятней всего, у нас что-то сломалось.
            <br />
            Попробуйте оформить заказ позже.
          </p>
        </div>
      ) : (
        <>
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
          <Pagination currentPage={currentPage} />
        </>
      )}
    </div>
  );
};

export default Home;
