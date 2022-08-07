import style from './Search.module.scss';
import { useContext } from 'react';
import { SearchContext } from '../../App';
const Search = () => {
  const { searchWord, setSearchWord } = useContext(SearchContext);
  return (
    <div className={style.search}>
      <svg
        className={style.loop}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32">
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        type="text"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        className={style.input}
        placeholder="Поиск..."
      />
      {searchWord && (
        <svg
          className={style.clear}
          onClick={() => setSearchWord('')}
          width="17px"
          height="17px"
          viewBox="0 0 17 17">
          <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round">
            <g id="24-px-Icons" transform="translate(-364.000000, -124.000000)" stroke="#000000">
              <g id="ic_cancel" transform="translate(360.000000, 120.000000)">
                <g id="cross">
                  <g transform="translate(5.000000, 5.000000)" strokeWidth="2">
                    <path d="M0,0 L14.1421356,14.1421356" id="Line"></path>
                    <path d="M14,0 L1.77635684e-15,14" id="Line"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
