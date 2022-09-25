import { useState, useRef, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortType } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';
import { SortType } from '../redux/slices/filterSlice';

// type SortItem = {
//   name: string;
//   sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
// };

export const categotyList: SortType[] = [
  { name: 'популярности 🠗', sortProperty: 'rating' },
  { name: 'популярности 🠕', sortProperty: '-rating' },
  { name: 'цене 🠗', sortProperty: 'price' },
  { name: 'цене 🠕', sortProperty: '-price' },
  { name: 'алфавиту 🠗', sortProperty: 'title' },
  { name: 'алфавиту 🠕', sortProperty: '-title' },
];

const SortList: React.FC = memo(() => {
  const sortType = useSelector((state: RootState) => state.filter.sort);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const onVisible = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  const onChangeCategory = (categoryObj: SortType) => {
    dispatch(setSortType(categoryObj));
    onVisible();
  };

  useEffect(() => {
    const handleKlickOnsite = (event: MouseEvent) => {
      if (sortRef.current) {
        if (!event.composedPath().includes(sortRef.current)) {
          setIsVisible(false);
        }
      }
    };
    document.body.addEventListener('click', handleKlickOnsite);
    return () => {
      document.body.removeEventListener('click', handleKlickOnsite);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={onVisible}>{sortType.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {categotyList.map((obj, i) => {
              return (
                <li
                  className={sortType === obj ? `active` : ''}
                  onClick={() => onChangeCategory(obj)}
                  key={i}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortList;
